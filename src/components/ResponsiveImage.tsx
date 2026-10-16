import type { ImgHTMLAttributes } from "react";
import { responsiveImageProps } from "@/lib/images";

type Props = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height"
> & {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  decoding = "async",
  ...props
}: Props) {
  return (
    <img
      {...responsiveImageProps(src, width)}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
}
