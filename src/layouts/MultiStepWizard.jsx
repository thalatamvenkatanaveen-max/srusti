import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const MultiStepWizard = ({ steps, handleFinish }) => {
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

  const { getValues } = methods;
  const formData = getValues();

  return (
    <FormProvider {...methods}>
      {/* Make the outer card a fixed-height, column flex container */}
      <div className="mx-auto flex h-[90vh] max-w-4xl flex-col overflow-hidden rounded-lg border bg-amber-50 shadow-md">
        {/* Step Header (non-growing) */}
        <div className="mb-0 shrink-0">
          <div className="flex items-center justify-center space-x-4 bg-amber-200 p-6">
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
          {/* <div className="px-8 py-3 text-center text-2xl font-semibold">
            {steps[current].title}
          </div> */}
        </div>

        {/* Step Content — the ONLY scrollable area, expands to fill remaining height */}
        <div className="flex-1 overflow-y-auto px-6 pt-5 pb-6">
          <StepContainer setShowSkip={setShowSkip} />
        </div>

        {/* Footer Buttons (non-growing, pinned at bottom of the card) */}
        <div className="flex shrink-0 justify-end gap-4 bg-amber-200 px-8 py-4">
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
            onClick={() => (isLast ? handleFinish(formData) : handleNext())}
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
