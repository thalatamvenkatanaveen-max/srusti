import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const MultiStepWizard = ({ steps }) => {
  const [current, setCurrent] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const methods = useForm({
    resolver: steps[current].validationSchema
      ? yupResolver(steps[current].validationSchema)
      : null,
  });

  const StepContainer = steps[current].component;

  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  const handleNext = methods.handleSubmit(() => {
    if (!isLast) setCurrent(current + 1);
  });

  const handlePrevious = () => {
    if (!isFirst) setCurrent(Math.max(current - 1, 0));
  };

  const handleSkip = () => {
    if (!isLast) setCurrent(current + 1);
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border bg-amber-50 shadow-md">
        {/* Step Header */}
        <div className="mb-4 flex items-center justify-center space-x-4 bg-amber-200 p-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                index === current
                  ? "cursor-pointer bg-amber-600 text-white"
                  : "cursor-not-allowed bg-amber-100 text-gray-600"
              }`}
            >
              {item.title}
            </div>
          ))}
        </div>

        {/* Step Title */}
        <div className="text-center text-2xl font-semibold">
          {steps[current].title}
        </div>

        {/* Step Content */}
        <div className="px-8 py-4">
          <StepContainer setShowSkip={setShowSkip} />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4 bg-amber-200 px-8 py-6">
          {!isFirst && (
            <button
              onClick={handlePrevious}
              className="rounded bg-gray-300 px-6 py-2 text-sm font-medium hover:bg-gray-400"
            >
              Previous
            </button>
          )}

          {showSkip && !isLast && (
            <button
              onClick={handleSkip}
              className="rounded bg-gray-300 px-6 py-2 text-sm font-medium hover:bg-gray-400"
            >
              Skip
            </button>
          )}

          <button
            onClick={handleNext}
            className="rounded bg-amber-600 px-6 py-2 text-sm font-medium text-white hover:bg-amber-700"
          >
            {isLast ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default MultiStepWizard;
