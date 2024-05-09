import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';


jest.mock('./API/fetchPlace');
jest.mock('./API/fetchWeatherData');
jest.mock('./API/fetchCity');
jest.mock('./API/parseWeatherData');

describe('App Component', () => {
  it('renders city input and location button', () => {
    const { getByPlaceholderText, getByRole } = render(<App />);
    
   
    expect(getByRole('button', { name: 'Location' })).toBeInTheDocument();
  });

  it('updates input value when user types in city input', () => {
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('Enter city or zip code');


    fireEvent.change(input, { target: { value: 'London' } });

    
    expect(input).toHaveValue('London');
  });

  it('fetches weather data when user types in city input', async () => {
  
    const mockFetchPlace = jest.fn(() => Promise.resolve([{ formatted_address: 'New York, NY, USA' }]));
    jest.mock('./API/fetchPlace', () => mockFetchPlace);

    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('Enter city or zip code');

    
    fireEvent.change(input, { target: { value: 'New York' } });

    await waitFor(() => {
      expect(mockFetchPlace).toHaveBeenCalledWith('New York');
    });
  });


});
