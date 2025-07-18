import patient1 from '../../assets/images/patient3.jpg';
import patient2 from '../../assets/images/patient2.jpg';
import patient3 from '../../assets/images/patient3.jpg';

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
};

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Dr. Karen Njoroge',
    role: 'General Practitioner',
    image: patient1,
    content:
      'This system has transformed how I manage my appointments and patient records. I can quickly access information and focus on giving better care.',
  },
  {
    id: 2,
    name: 'John Mwangi',
    role: 'Patient',
    image: patient2,
    content:
      'Booking an appointment online was simple, and I received timely reminders. The experience at the clinic was seamless from start to finish.',
  },
  {
    id: 3,
    name: 'Mary Wanjiku',
    role: 'Patient',
    image: patient3,
    content:
      'I love how easy it is to check my follow‑up schedule. The system keeps everything organized and I never miss my consultations.',
  },
  {
    id: 4,
    name: 'Dr. Samuel Ochieng',
    role: 'Specialist',
    image: patient1,
    content:
      'The dashboard gives me real‑time insights into my patients and schedules. It saves hours every week and keeps my practice running smoothly.',
  },
  {
    id: 5,
    name: 'Amina Hassan',
    role: 'Patient',
    image: patient2,
    content:
      'I used to wait in long queues, but now I book, confirm, and even reschedule appointments online. It has made accessing healthcare so much easier.',
  },
  {
    id: 6,
    name: 'Dr. Peter Kiprop',
    role: 'Clinic Administrator',
    image: patient3,
    content:
      'Managing multiple doctors and patient logs is no longer a headache. This system keeps our entire team on the same page.',
  },
];
