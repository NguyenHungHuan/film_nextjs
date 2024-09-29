import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: {
    default: "Xem phim Online | VNPhim",
    template: "%s | VNPhim",
  },
  description: "Web xem phim online miễn phí lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia xem phim và thảo luận với hơn 10 triệu thành viên 🎉 tại VNPhim ❤️💛💚",
  keywords: 'Xem phim, Xem phim online, Film, Films, TV shows, Anime, anime, tv shows, series, film series, Phim goc, Xem phim gốc, xem phim gốc, xem phim, Xem phim hot, Xem phim hay, Xem phim ngôn tình, Xem phim hành động, Xem phim kinh dị, Xem phim Hàn quốc, xem phim nhật bản, xem phim trung quốc, xem phim thái lan, xem phim ma, xem phim mới nhất, xem phim mới, xem phim hay, xem phim âu mỹ, xem phim anh, vnphim, VNPhim, motphim, dongphim, dongphym, motchill, xemphim, phimblur, phimblu',
  authors: [{ name: 'Xem phim VNPhim - Nguyễn Hùng Huân', url: 'https://vnphim.vercel.app/' }],
  openGraph: {
    title: "Xem phim Online | VNPhim",
    description: "Web xem phim online miễn phí lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia xem phim và thảo luận với hơn 10 triệu thành viên 🎉 tại VNPhim ❤️💛💚",
    url: 'https://vnphim.vercel.app/',
    siteName: 'Xem phim VNPhim - Nguyễn Hùng Huân - Nextjs Project',
    images: [
      {
        url: 'https://nextjs.org/og.png',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vnphim.vercel.app/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Header />
          {children}
          <div className='hidden md:block'>
            <ScrollToTop />
          </div>
        <Footer/>
      </body>
    </html>
  );
}
