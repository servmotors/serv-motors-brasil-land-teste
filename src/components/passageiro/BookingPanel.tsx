
import React from 'react';
import { BookingPanel } from '@/components/passageiro/booking';

// Re-export the RideData type for compatibility with existing code
export type { RideData } from '@/components/passageiro/booking/types';

// This file is now just a re-export of the refactored BookingPanel
export default BookingPanel;
