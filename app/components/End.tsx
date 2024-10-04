"use client"

import dayjs from "dayjs";

export default function End(props: any) {
    const { time , title , now , i } = props;
    console.log(now);
    
    return (
        <div>
            {dayjs(time).diff(now,"seconds") < 0 && (
                <div className="my-2 border border-1 p-2 border-zinc-600 rounded-md">
                    <h2 className={`${i == 0 ? "text-5xl " : "text-2xl"} font-bold`}>
                        {dayjs(time).format("HH:mm:ss")} in {dayjs(time).diff(now,"seconds")} - {title}
                    </h2>
                </div>
            )}
        </div>
    )
}