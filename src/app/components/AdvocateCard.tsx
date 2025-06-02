// components/AdvocateCard.tsx
import styles from "./AdvocateCard.module.css";

export default function AdvocateCard({ advocate }) {
    return (
        <div className={styles.card}>
            <div className={styles.name}>
                <strong>{advocate.firstName} {advocate.lastName}</strong>
            </div>
            <div><strong>City:</strong> {advocate.city}</div>
            <div><strong>Degree:</strong> {advocate.degree}</div>
            <div><strong>Specialties:</strong> {advocate.specialties.join(", ")}</div>
            <div><strong>Experience:</strong> {advocate.yearsOfExperience} yrs</div>
            <div><strong>Phone:</strong> {advocate.phoneNumber}</div>
        </div>
    );
}