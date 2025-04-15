export default function OverviewPage() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Course Information</h3>
      <p className="text-sm mb-2">
        Description: This course provides a comprehensive introduction to
        computer science. You will learn the basics of programming using Python
        and apply these skills to solve real-world problems.
      </p>

      <p className="text-sm text-gray-500">Schedule</p>
      <p className="text-sm mb-2">Mon, Wed, Fri 10:00 AM - 11:15 AM</p>

      <p className="text-sm text-gray-500">Location</p>
      <p className="text-sm mb-2">Science Building, Room 301</p>

      <p className="text-sm text-gray-500">Term</p>
      <p className="text-sm">9/5/2023 to 12/15/2023</p>
    </div>
  );
}
