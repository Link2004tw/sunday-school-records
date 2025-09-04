'use client';
import PrimaryButton from "./components/PrimaryButton";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      {/* Hero Section */}
      <header className="bg-primary text-white py-15 text-center">
        <h1 className="text-4xl font-semibold mb-6">
          Welcome to Sunday School Manager
        </h1>
        <p className="text-lg mb-9">
          Keep track of your Sunday School with ease!
        </p>
        <PrimaryButton
          onClick={() => (window.location.href = "/auth")}
          className="bg-white text-primary hover:bg-muted"
        >
          Get Started
        </PrimaryButton>
      </header>

      {/* Features Section */}
      <section className="py-15 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-medium mb-7">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
          <div className="p-7 shadow-card rounded-lg">
            <h3 className="text-xl font-medium mb-4">Track Birthdays</h3>
            <p>Record and manage student birthdays for special celebrations.</p>
          </div>
          <div className="p-7 shadow-card rounded-lg">
            <h3 className="text-xl font-medium mb-4">Monitor Locations</h3>
            <p>Keep track of where students and families are located.</p>
          </div>
          <div className="p-7 shadow-card rounded-lg">
            <h3 className="text-xl font-medium mb-4">Manage Absences</h3>
            <p>Easily log attendance and identify absent students.</p>
          </div>
          <div className="p-7 shadow-card rounded-lg">
            <h3 className="text-xl font-medium mb-4">Record Scores</h3>
            <p>Track student performance with a simple scoring system.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-secondary py-15 text-center text-white">
        <h2 className="text-2xl font-medium mb-6">Join Us Today!</h2>
        <p className="mb-9">
          Sign up to manage your Sunday School records efficiently.
        </p>
        <PrimaryButton
          onClick={() => (window.location.href = "/auth")}
          className="bg-accent text-white hover:bg-yellow-600"
        >
          Sign Up Now
        </PrimaryButton>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}