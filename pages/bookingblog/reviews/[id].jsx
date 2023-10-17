import BookingBlogReviewCard from "@/components/BookingBlogReviewCard";
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu";
import PendingReviewCard from "@/components/PendingReviewCard";
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu";
import WriteReview from "@/components/WriteReview";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Reviews() {
  const router = useRouter();
  const [userReview, setUserReview] = useState(false);
  const [otherUserReview, setOtherUserReview] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [reservationData, setReservationData] = useState(false);

  useEffect(() => {
    const reservationId = router.query.id;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = localStorage.getItem("token");
    setUserInfo(JSON.parse(atob(token.split(".")[1])));
    fetch(`${BASE_URL}/reservations/all/${reservationId}?find=reviews`)
      .then((resp) => resp.json())
      .then((resp) => {
        setReservationData(resp.data);
      });
  }, [router.query.id]);

  useEffect(() => {
    if (reservationData)
      for (let review of reservationData?.reviews) {
        if (review?.sender._id === userInfo?.id) {
          setUserReview(review);
        } else {
          setOtherUserReview(review);
        }
      }
  }, [reservationData, userInfo]);

  return (
    <>
      {reservationData && (
        <div>
          <section className="flex flex-col items-center">
            <div className="max-w-[1024px] mt-[90px] w-full px-[24px] lg:px-0">
              <Link
                href="/bookingblog"
                className="text-[32px] md:text-[48px] font-[raleway] text-[#E91E63] font-bold py-[12px] inline-block"
              >
                Bitácora
              </Link>
            </div>
            <BookingBlogNavMenu />
            <BookingBlogDropdownMenu />
          </section>
          <main className="mt-[30px] p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px] max-w-screen-2xl min-h-[calc(100vh-256px)]">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
              {userReview ? (
                <BookingBlogReviewCard
                  authorName={`${userReview.sender.name} ${userReview.sender.lastname}`}
                  date={userReview.date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                  review={userReview.comment}
                  rate={userReview.rate}
                  picture={userReview.sender.picture}
                />
              ) : (
                <WriteReview
                  receiverName={
                    userInfo.userType === "host"
                      ? reservationData.client.name
                      : reservationData.host.name
                  }
                  senderId={
                    userInfo.userType === "host"
                      ? reservationData.host._id
                      : reservationData.client._id
                  }
                  receiverId={
                    userInfo.userType === "host"
                      ? reservationData.client._id
                      : reservationData.host._id
                  }
                  serviceId={
                    userInfo.userType === "host"
                      ? reservationData.pet[0]._id
                      : reservationData.host.accommodation
                  }
                  reservationId={reservationData._id}
                />
              )}

              {userReview && otherUserReview ? (
                <BookingBlogReviewCard
                  authorName={`${otherUserReview.sender.name} ${otherUserReview.sender.lastname}`}
                  date={otherUserReview.date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                  review={otherUserReview.comment}
                  rate={otherUserReview.rate}
                  picture={otherUserReview.sender.picture}
                />
              ) : (
                <PendingReviewCard />
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
}
