import React from "react";
import ControlledAccordions from "../Pages/Accordian";
function FaqAccordion() {
  const faqData = [
    {
      question: "What are the tax filing deadlines in my country?",
      answer:
        "Tax filing deadlines vary by country. It's essential to be aware of your specific country's tax deadlines to avoid penalties.",
    },
    {
      question: "How can I reduce my taxable income legally?",
      answer:
        "You can reduce your taxable income legally by taking advantage of tax deductions, credits, and exemptions provided by your country's tax laws.",
    },
    {
      question:
        "What records and documents do I need to maintain for tax purposes?",
      answer:
        "You should maintain records of income, expenses, receipts, and any relevant documents required by your tax authorities.",
    },
    {
      question: "Are there any tax-saving investment options available?",
      answer:
        "Yes, many countries offer tax-saving investment options like 401(k)s, IRAs, and other retirement accounts with tax benefits.",
    },
    {
      question: "How can I handle tax audits?",
      answer:
        "If you're audited, it's crucial to remain organized, provide requested documentation, and consider seeking professional assistance.",
    },
    {
      question:
        "What are the implications of international taxation for my business?",
      answer:
        "International taxation can be complex. It's essential to understand how cross-border transactions impact your business's tax liability.",
    },
    {
      question:
        "What tax credits or incentives are available for small businesses?",
      answer:
        "Depending on your country, there may be tax credits and incentives designed to support small businesses, such as research and development credits or grants.",
    },
  ];

  return (
    <div className="faq-accordion">
      {faqData.map(ele => {
        return <ControlledAccordions data={ele} />;
      })}
    </div>
  );
}

export default FaqAccordion;
