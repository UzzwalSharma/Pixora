import { useState ,React } from "react";
import NeonSubscriptionModal from "/src/Orderform/Modelpopup.jsx";
import OrderSuccessModal from "./OrderSuccessModal";

const FullstackForm = () => {

    const [wantsTweaks, setWantsTweaks] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("Pro");
    const [showModal, setShowModal] = useState(false); // Define showModal state
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    // const [selectedPlan, setSelectedPlan] = useState("Premium"); // Set the selected plan
  
    // This function will handle opening the modal
    const openModal = () => {
      setShowModal(true);
    };
  
    // This function will handle closing the modal
    const closeModal = () => {
      setShowModal(false);
    };
  
    const handleVerify = async () => {
      console.log("Sending request...");
    
      try {
        const response = await fetch("https://pixora-s-backend.onrender.com/send-confirmation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userName,
            email: userEmail,
            plan: selectedPlan,
            tweaks: wantsTweaks ? "Yes" : "No",
          }),
        });
    
        if (response.ok) {
          console.log("✅ Confirmation email sent!");
          setShowSuccessModal(true);
        } else {
          console.error("❌ Email not sent");
        }
      } catch (error) {
        console.error("❌ Error sending confirmation email:", error);
      }
    };
    
    
  
  return (
    <section className="w-full min-h-screen flex items-center py-20 px-6 md:px-24 bg-black relative">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 space-y-6 p-8 bg-black/60 backdrop-blur-md rounded-xl shadow-lg text-white">
  <h2 className="text-4xl font-bold text-[#00ffbf] mb-6 drop-shadow-md">
    Want a Full-Stack Solution?
  </h2>

  <form className="space-y-6">
  <div className="flex flex-col">
  <label>Your Name</label>
  <input
    type="text"
    className="p-3 rounded-lg bg-black/30 border border-[#00ffbf]/30 focus:ring-2 focus:ring-[#00ffbf]"
    placeholder="Enter your name"
    value={userName} // Bind the input value to the state
    onChange={(e) => setUserName(e.target.value)} // Update the state on input change
  />
</div>

<div className="flex flex-col">
  <label>Email</label>
  <input
    type="email"
    className="p-3 rounded-lg bg-black/30 border border-[#00ffbf]/30 focus:ring-2 focus:ring-[#00ffbf]"
    placeholder="Enter your email"
    value={userEmail} // Bind the input value to the state
    onChange={(e) => setUserEmail(e.target.value)} // Update the state on input change
  />
</div>


    <div className="flex flex-col">
      <label>Company / Brand Name</label>
      <input
        type="text"
        className="p-3 rounded-lg bg-black/30 border border-[#00ffbf]/30 focus:ring-2 focus:ring-[#00ffbf]"
        placeholder="Your brand or company (optional)"
      />
    </div>

    <div className="flex flex-col mt-6">
  <label className="mb-3 text-lg font-semibold text-[#00ffbf] drop-shadow">
    Do you want the exact same website Pixora generated earlier, or do you want changes?
  </label>

  <div className="flex flex-col sm:flex-row gap-4">
    <button
      type="button"
      className={`px-4 py-2 rounded-lg border-2 transition duration-300 ${
        !wantsTweaks
          ? 'bg-yellow-300 text-white font-semibold shadow-[0_0_12px_rgba(250,204,21,0.8)] border-yellow-300'
          : 'bg-black/30 text-white border-yellow-300/30 hover:bg-yellow-300/10'
      }`}
      onClick={() => setWantsTweaks(false)}
    >
      Yes, keep it exactly the same
    </button>

    <button
      type="button"
      className={`px-4 py-2 rounded-lg border-2 transition duration-300 ${
        wantsTweaks
          ? 'bg-[#00ffbf] text-white font-semibold shadow-[0_0_12px_#00ffbf] border-transparent'
          : 'bg-black/30 text-white border-[#00ffbf]/30 hover:bg-[#00ffbf]/10'
      }`}
      onClick={() => setWantsTweaks(true)}
    >
      No, I want some tweaks
    </button>
  </div>

 
</div>


        {wantsTweaks && (
          <div className="flex flex-col">
            <label>Describe the Tweaks</label>
            <textarea
              rows={3}
              className="p-3 rounded-lg bg-black/30 border border-[#00ffbf]/30 focus:ring-2 focus:ring-[#00ffbf] resize-none"
              placeholder="Mention what changes or tweaks you’d like..."
            />
          </div>
        )}


   

<div className="flex flex-col">
            <label className="mb-2">Choose Plan</label>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => setSelectedPlan("Pro")}
                className={`shimmer-button planBtn ${selectedPlan === "Pro" ? "planSelectedPro" : ""}`}
              >
                Pro (4–5 days)
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan("Premium")}
                className={`shimmer-button planBtn ${selectedPlan === "Premium" ? "planSelectedPremium" : ""}`}
              >
                Premium (24–48 hrs)
              </button>
            </div>
          </div>

    <button
            type="button"
            className="border-amber-300 w-full mt-4 py-3 bg-[#00ffbf] text-white font-semibold text-lg rounded-lg hover:bg-[#00ffbf]/80 transition"
            onClick={() => setShowModal(true)}
          >
            Submit Request
          </button>
  </form>
</div>


      {/* Right Side: Single Image */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center mt-12 md:mt-0">
        {/* Replace this with your image */}
        <div className="w-full max-w-lg p-4">
          <img
            src="/2151645630.jpg" // Replace with the actual image path
            alt="Full-Stack Solution"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
     

      <NeonSubscriptionModal
  showModal={showModal}
  selectedPlan={selectedPlan}
  onClose={() => setShowModal(false)}
  onVerify={handleVerify}
  onSuccess={() => setShowSuccessModal(true)} // ✅ Trigger OrderSuccessModal
/>

{showSuccessModal && (
  <OrderSuccessModal onClose={() => setShowSuccessModal(false)} />
)}

    </section>
  );
};

export default FullstackForm;
