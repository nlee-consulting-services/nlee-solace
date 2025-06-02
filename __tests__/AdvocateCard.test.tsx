import { render, screen } from '@testing-library/react';
import AdvocateCard from '@/app/components/AdvocateCard';

const mockAdvocate = {
    firstName: 'Jane',
    lastName: 'Doe',
    city: 'Seattle',
    degree: 'LCSW',
    specialties: ['Trauma', 'Couples'],
    yearsOfExperience: 10,
    phoneNumber: '555-000-1234',
};

describe('AdvocateCard', () => {
    it('renders basic advocate info', () => {
        render(<AdvocateCard advocate={mockAdvocate} />);
        expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();
        expect(screen.getByText(/Seattle/)).toBeInTheDocument();
        expect(screen.getByText(/LCSW/)).toBeInTheDocument();
        expect(screen.getByText(/10 yrs/)).toBeInTheDocument();
        expect(screen.getByText(/555-000-1234/)).toBeInTheDocument();
    });

    it('displays specialties as comma-separated string', () => {
        render(<AdvocateCard advocate={mockAdvocate} />);
        expect(screen.getByText(Trauma, Couples/)).toBeInTheDocument();
    });
});
