import React from "react";
import Spinner from "./Spinner"
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/jest-dom/extend-expect';
// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
test('sanity', () => {
  expect(true).toBe(true)
})
test('spinner renders when on', () => {
  render(<Spinner on={true}/>)
  
  const message = screen.findByText("Please wait...")

  expect(message).toBeInTheDocument
})
test('spinner renders when off', () => {
  render(<Spinner on={false}/>)
  
  const message = screen.findByText("Please wait...")

  expect(message).not.toBeInTheDocument
})
