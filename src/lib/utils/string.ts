export function zeroPadding(value: number, number?: number): string {
    const paddingNumber = number || 2
    const str =
      Array.from(Array(paddingNumber))
        .map((t) => '0')
        .join('') + value.toString()
    return str.slice(paddingNumber * -1)
}

export function getTimerObject(time: number, noHour?: boolean) {
    const h = Math.floor(time/60/60);
    const m = noHour ? Math.floor(time/60) :Math.floor(time/60)%60;
    const s = time%60
    const timeText = `${(h>0 && !noHour)?`${h} 時 `:''}${m>0?`${m} 分 `:''}${s} 秒`;
    const showTime = `${noHour? '' : `${zeroPadding(h)} : `}${zeroPadding(m)} : ${zeroPadding(s)}`

    return {h,m,s,timeText,showTime};
}
