import { useState ,React } from "react";
import NeonSubscriptionModal from "/src/Orderform/Modelpopup.jsx";
const FullstackForm = () => {

    const [wantsTweaks, setWantsTweaks] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("Pro");
    const [showModal, setShowModal] = useState(false); // Define showModal state
    // const [selectedPlan, setSelectedPlan] = useState("Premium"); // Set the selected plan
  
    // This function will handle opening the modal
    const openModal = () => {
      setShowModal(true);
    };
  
    // This function will handle closing the modal
    const closeModal = () => {
      setShowModal(false);
    };
  
    const handleVerify = () => {
      // Handle successful verification
      console.log("Subscription verified!");
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
      />
    </div>

    <div className="flex flex-col">
      <label>Email</label>
      <input
        type="email"
        className="p-3 rounded-lg bg-black/30 border border-[#00ffbf]/30 focus:ring-2 focus:ring-[#00ffbf]"
        placeholder="Enter your email"
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

  {wantsTweaks && (
    <textarea
      rows={4}
      className="mt-4 p-4 rounded-lg bg-black/30 border border-[#00ffbf]/30 focus:ring-2 focus:ring-[#00ffbf] resize-none transition duration-300 ease-in-out text-white placeholder-white/60"
      placeholder="Describe the tweaks or improvements you want..."
    />
  )}
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

    {/* <div className="flex flex-col">
      <label>Project Description</label>
      <textarea
        rows={4}
        className="p-3 rounded-lg bg-black/30 border border-[#00ffbf]/30 focus:ring-2 focus:ring-[#00ffbf] resize-none"
        placeholder="Tell us what kind of website you need..."
      />
    </div> */}

   

   

   

    {/* <div className="flex flex-col">
      <label>Upload Logo / Files (Optional)</label>
      <input
        type="file"
        className="p-3 rounded-lg bg-black/30 border border-[#00ffbf]/30 file:text-white file:bg-[#00ffbf]/20 file:border-none file:rounded-md file:px-4 file:py-2 hover:file:bg-[#00ffbf]/30 transition"
      />
    </div> */}

<div className="flex flex-col">
            <label className="mb-2">Choose Plan</label>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => setSelectedPlan("Pro")}
                className={`planBtn ${selectedPlan === "Pro" ? "planSelectedPro" : ""}`}
              >
                Pro (4–5 days)
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan("Premium")}
                className={`planBtn ${selectedPlan === "Premium" ? "planSelectedPremium" : ""}`}
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
      {/* {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-black rounded-xl p-8 w-[90%] max-w-md text-white border border-[#00ffbf] shadow-xl relative">
            <h2 className="text-xl font-bold mb-4 text-[#00ffbf] drop-shadow">
              You’ve chosen the <span className="text-yellow-300">{selectedPlan}</span> Plan
            </h2>
            <p className="mb-4">Please enter your subscription code to continue:</p>

            <input
              type="text"
              value={subscriptionCode}
              onChange={(e) => setSubscriptionCode(e.target.value)}
              placeholder="Enter code"
              className="w-full p-3 rounded-lg bg-black/30 border border-[#00ffbf]/30 focus:ring-2 focus:ring-[#00ffbf] text-white placeholder-white/60 mb-3"
            />
            {codeError && <p className="text-red-500 text-sm mb-2">{codeError}</p>}

            <div className="flex justify-end gap-4">
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#00ffbf] text-black font-semibold rounded-lg hover:bg-[#00ffbf]/80 transition" onClick={handleSubmit}>
                Verify & Submit
              </button>
            </div>
          </div>
        </div>
      )} */}

<NeonSubscriptionModal
  showModal={showModal}
  selectedPlan={selectedPlan}
  onClose={() => setShowModal(false)}
  onVerify={() => {
    // do something on successful verification
    console.log("Verified!");
  }}
/>

    </section>
  );
};

export default FullstackForm;
