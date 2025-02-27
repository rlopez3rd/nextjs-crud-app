'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

// Define the context types
interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

// Create the Modal Context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Modal Provider Component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* Reusable Modal */}
      <Modal open={isOpen} onClose={closeModal}>
        <>
        {modalContent}
        </>
      </Modal>
    </ModalContext.Provider>
  );
};

// Custom Hook to use the modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
