// import React, { createContext, useContext, useState } from "react";

// // Create an Auth context
// const InquiryContext = createContext();

// export const InquiryProvider = ({ children }) => {
//     const [inquiryState, setInquiryState] = useState(false);

//     return (
//         <InquiryContext.Provider
//             value={{
//                 inquiryState,
//                 setInquiryState
//             }}
//         >
//             {children}
//         </InquiryContext.Provider>
//     );
// };

// // Custom hook to use the Auth context
// export const inquiryContext = () => useContext(InquiryContext);
