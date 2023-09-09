export default function ReviewCard({
    authorImage,
    authorName,
    reviewDate,
    value,
    review,
}) {
    return (
        <div
            href="/"
            className="transition w-full bg-white rounded-[16px] bg-opacity-70 p-[16px] md:p-[24px] flex flex-col sm:flex-row gap-[16px] backdrop-blur-[8px] shadow-xl sm:h-[200px] md:h-[180px] lg:h-[240px] xl:h-[180px] justify-between align-middle items-center"
        >
            <img className="rounded-full w-[104px] h-[104px]" src={authorImage} />
            <div className="flex flex-col w-full items-center justify-between sm:justify-normal gap-[24px]">
                <div className="flex flex-col sm:flex-row justify-between sm:w-full items-center sm:items-start">
                    <div className="flex flex-col items-center sm:items-start">
                        <p className="text-[24px] font-semibold font-[Nunito]">
                            {authorName}
                        </p>
                        <p className="text-[16px] font-light font-[Nunito]">{reviewDate}</p>
                    </div>
                    <div>
                        <p className="text-[20px] font-light font-[Nunito]">{value}</p>
                    </div>
                </div>
                <div className="w-full text-center sm:text-left">
                    <p className="text-[16px] font-normal font-[Nunito]">
                        {review.slice(0, 150)}...
                    </p>
                </div>
            </div>
        </div>
    );
}