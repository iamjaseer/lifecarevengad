import Image from "next/image"



export default function Images({imageurl, styles, quality, width, height, alt, classes, placeholder}) {

    const blurUrl_ = 'data:image/webp;base64,UklGRhICAABXRUJQVlA4WAoAAAAgAAAABQAAAwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggJAAAANABAJ0BKgYABAAJAKwlAF2AHpMfuDUAAP6wuhuLZW9nb+eAAA'
    
  return (
    <>
    {imageurl == null ? <Image style={{ opacity: 0.6 }} quality={quality} width={width} height={height} src='/images/placeholder-1-1.webp' className={classes} alt="No image available" /> : <Image width={width} height={height} quality={quality} placeholder={placeholder == true ? 'blur' : 'empty'} blurDataURL={blurUrl_}  src={imageurl} className={classes} alt={alt} />}
   
    </>
  )
}
