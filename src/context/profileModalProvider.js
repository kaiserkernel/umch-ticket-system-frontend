import React, { createContext, useContext, useState } from "react";
import ProfileModal from "../components/edit-profile";

const ModalContext = createContext();

export const ProfileModalProvider = ({ children }) => {
    const [profileModalVisible, setProfileModalVisible] = useState(false);

    return (
        <ModalContext.Provider value={{ profileModalVisible, setProfileModalVisible }}>
            {children}
            <ProfileModal />
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
