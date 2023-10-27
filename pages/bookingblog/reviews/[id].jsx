import BookingBlogReviewCard from "@/components/BookingBlogReviewCard";
import BookingBlogNavMenu from "@/components/BookingBlogNavMenu";
import PendingReviewCard from "@/components/PendingReviewCard";
import BookingBlogDropdownMenu from "@/components/BookingBlogDropdownMenu";
import WriteReview from "@/components/WriteReview";
import Link from "next/link";
import Head from "next/head";
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
    if (reservationData) {
      userInfo.id === reservationData.client._id ||
      userInfo.id === reservationData.host._id
        ? null
        : router.push("/404");
      reservationData.status !== "paid" &&
      reservationData.status !== "current" &&
      reservationData.status !== "concluded"
        ? router.push("/404")
        : null;
      if (reservationData.reviews) {
        for (let review of reservationData?.reviews) {
          if (review?.sender._id === userInfo?.id) {
            setUserReview(review);
          } else {
            setOtherUserReview(review);
          }
        }
      }
    }
  }, [reservationData, userInfo, router]);

  return (
    <>
      <Head>
        <title>{`Bitácora - Reseñas`}</title>
      </Head>
      <main className="min-h-screen">
        {reservationData && (
          <div>
            <section className="flex flex-col items-center">
              <div className="max-w-[1024px] mt-[90px] w-full px-[24px] lg:px-0">
                <Link
                  href={`/bookingblog/${reservationData._id}`}
                  className="text-[32px] md:text-[48px] font-[raleway] text-[#E91E63] font-bold py-[12px] inline-block"
                >
                  Bitácora
                </Link>
              </div>
              <BookingBlogNavMenu />
              <BookingBlogDropdownMenu />
            </section>
            {reservationData.status !== "concluded" ? (
              <p className="text-center mt-[70px] text-[30px] max-w-[700px] m-auto text-[##2b2e4a]">
                Esta sección estará disponible en cuanto la reservación se haya
                concluido
              </p>
            ) : (
              <section className="mt-[30px] p-[12px] md:p-[24px] lg:p-[32px] xl:p-[40px] max-w-screen-2xl min-h-[calc(100vh-256px)] mx-auto">
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
                  {otherUserReview ? (
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
                    <PendingReviewCard
                      name={
                        userInfo.userType === "host"
                          ? reservationData.client.name
                          : reservationData.host.name
                      }
                    />
                  )}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </>
  );
}
