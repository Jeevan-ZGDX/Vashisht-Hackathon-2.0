"use client";
import React from "react";

function MainComponent() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    hairType: "",
    hairGoal: "",
    scalpCondition: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState({});
  const [saveError, setSaveError] = useState(null);
  const questions = [
    {
      title: "What's your email?",
      field: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      title: "What is your hair type?",
      field: "hairType",
      type: "select",
      options: ["Straight", "Wavy", "Curly", "Coily"],
    },
    {
      title: "What is your hair goal?",
      field: "hairGoal",
      type: "select",
      options: ["Strengthening", "Growth", "Hydration", "Anti-frizz"],
    },
    {
      title: "How would you describe your scalp condition?",
      field: "scalpCondition",
      type: "select",
      options: ["Dry", "Oily", "Normal", "Sensitive"],
    },
  ];
  const validateStep = () => {
    const currentQuestion = questions[step];
    const value = formData[currentQuestion.field];

    if (!value) {
      setErrors({ [currentQuestion.field]: "This field is required" });
      return false;
    }

    if (currentQuestion.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setErrors({ [currentQuestion.field]: "Please enter a valid email" });
      return false;
    }

    setErrors({});
    return true;
  };
  const handleNext = async () => {
    if (!validateStep()) return;

    if (step === questions.length - 1) {
      try {
        const response = await fetch("/api/save-quiz-results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setSaveError(null);
          setShowResults(true);
        } else {
          throw new Error(result.message || "Failed to save quiz results");
        }
      } catch (error) {
        console.error("Failed to save quiz results:", error);
        setSaveError("Sorry, we couldn't save your results. Please try again.");
      }
    } else {
      setStep(step + 1);
    }
  };
  const recommendations = {
    routine: [
      "Gentle cleansing with sulfate-free shampoo",
      "Deep conditioning treatment twice a week",
      "Leave-in conditioner for extra moisture",
      "Regular scalp massage to promote blood circulation",
    ],
    products: [
      {
        name: "Moisturizing Shampoo",
        description: "Gentle, sulfate-free formula for daily use",
      },
      {
        name: "Deep Conditioning Mask",
        description: "Intensive treatment for weekly use",
      },
      {
        name: "Leave-in Conditioner",
        description: "Lightweight moisture for daily protection",
      },
    ],
  };
  const currentQuestion = questions[step];

  if (showResults) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Your Personalized Hair Care Routine
          </h1>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Your Hair Profile
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Hair Type
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {formData.hairType}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Hair Goal
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {formData.hairGoal}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Scalp Condition
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {formData.scalpCondition}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recommended Routine
            </h2>
            <div className="space-y-4">
              {recommendations.routine.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center flex-shrink-0 mr-4">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recommended Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.products.map((product, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                setShowResults(false);
                setStep(0);
                setFormData({
                  email: "",
                  hairType: "",
                  hairGoal: "",
                  scalpCondition: "",
                });
              }}
              className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md hover:opacity-80 transition-opacity"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-xl mx-auto px-4 py-20">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 mx-1 rounded ${
                  index <= step
                    ? "bg-gray-900 dark:bg-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Step {step + 1} of {questions.length}
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {currentQuestion.title}
        </h2>

        {currentQuestion.type === "email" ? (
          <input
            type="email"
            value={formData[currentQuestion.field]}
            onChange={(e) =>
              setFormData({
                ...formData,
                [currentQuestion.field]: e.target.value,
              })
            }
            placeholder={currentQuestion.placeholder}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() =>
                  setFormData({ ...formData, [currentQuestion.field]: option })
                }
                className={`p-4 rounded-md border ${
                  formData[currentQuestion.field] === option
                    ? "border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {errors[currentQuestion.field] && (
          <p className="text-red-500 mt-2">{errors[currentQuestion.field]}</p>
        )}

        {saveError && <p className="text-red-500 mt-2">{saveError}</p>}

        <button
          onClick={handleNext}
          className="w-full mt-8 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md hover:opacity-80 transition-opacity"
        >
          {step === questions.length - 1 ? "See Results" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default MainComponent;
