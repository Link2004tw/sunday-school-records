// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
      <p>&copy; {new Date().getFullYear()} Sunday School Manager. All rights reserved.</p>
      <p className="mt-2">
        <a href="/contact" className="text-blue-300 hover:underline">Contact Us</a> | 
        <a href="/about" className="text-blue-300 hover:underline ml-2">About Us</a>
      </p>
    </footer>
  );
}