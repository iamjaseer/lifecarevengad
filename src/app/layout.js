
import "../../public/styles/globals.min.css";
import Header from './components/Header';
import Footer from './components/Footer';



export const metadata = {

  // icons: {
  //   icon: '../public/images/favicon.ico',
  //   shortcut: '../public/images/favicon.ico',
  //   apple: '../public/images/apple-touch-icon.png',
  // },

  title: {
    default: 'Life Care Clinic - Your Best clinic in vengad!',
    template: '%s'
  },
  openGraph: {
    description: 'Looking for the best clinic in Vengad? Experience top-quality care at Life Care Clinic. Your health is our priority',
    siteName: 'Life Care Clinic: Building Wellness, Every Day',
    url: 'https://lifecarevengad.com/',
    images: [
      {
        url: 'https://lifecarevengad.com/wp-content/uploads/2024/02/placeholder.webp',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  //   twitter: {
  //   card: 'summary_large_image',
  //   title: 'Life Care Clinic - Your Best clinic in vengad!',
  //   description: 'Looking for the best clinic in Vengad? Experience top-quality care at Life Care Clinic. Your health is our priority',
  //    images: ['https://lifecarevengad.com/wp-content/uploads/2024/02/doctor-2.webp'],
  // },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div style={{ marginTop: '72px' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
