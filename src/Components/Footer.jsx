import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-clr1 to-clr2 text-white relative overflow-hidden py-12 mt-[8vh] md:mt-[20vh]">
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white bg-opacity-10 rounded-full animate-bounce"></div>

      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-6 tracking-wider border-b-4 border-white pb-2 w-max">Our Company</h2>
            <p className="text-lg leading-relaxed mb-6">
              Dedicated to providing the best services for your needs with a focus on innovation and excellence.
            </p>
            <p className="flex items-center gap-3 text-lg">
              <FaMapMarkerAlt className="text-white" />
              AWT Korangi Crossing, Karachi
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-bold mb-6 tracking-wider border-b-4 border-white pb-2 w-max">Follow Us</h2>
            <div className="flex gap-6">
              {[
                { icon: FaFacebookF, link: '#' },
                { icon: FaInstagram, link: '#' },
                { icon: FaTwitter, link: '#' },
              ].map(({ icon: Icon, link }, idx) => (
                <a
                  href={link}
                  key={idx}
                  className="group relative w-12 h-12 flex items-center justify-center bg-white bg-opacity-20 rounded-full hover:bg-opacity-50 transition-all duration-300 shadow-lg"
                >
                  <Icon size={20} className="text-white group-hover:scale-125 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-6 tracking-wider border-b-4 border-white pb-2 w-max">Contact Us</h2>
            <div className="space-y-4">
              {[
                { icon: FaEnvelope, text: 'arsaljawed9999@gmail.com' },
                { icon: FaPhone, text: '(+92)-304-2719369' },
                { icon: FaMapMarkerAlt, text: 'AWT Korangi Crossing, Karachi' },
              ].map(({ icon: Icon, text }, idx) => (
                <div key={idx} className="flex items-center gap-4 text-lg">
                  <Icon className="text-white w-6 h-6" />
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-sm border-t-[1px] border-white border-opacity-30 pt-4">
        <p>
          © {new Date().getFullYear()} Our Company. All Rights Reserved. Built with 💖 by AREX.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
