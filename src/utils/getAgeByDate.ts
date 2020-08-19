export default function getAgeByDate(date: Date): number {
  let age: number;
  const currentDate = new Date();
  const bornDate = new Date(date);

  age = currentDate.getFullYear() - bornDate.getFullYear();

  if (bornDate.getMonth() + 1 >= currentDate.getMonth() + 1) {
    if (bornDate.getDate() < currentDate.getDate()) {
      age -= 1;
    }
  }

  return age;
}
