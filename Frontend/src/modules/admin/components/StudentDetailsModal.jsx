import axios from "axios";

const StudentDetailsModal = ({ student, toggle, refresh }) => {
  const handleDelete = async () => {
    try {
      await deleteStudent(student.sid);
      alert(`Student with id ${student.sid} Deleted Successfully`);
      refresh((prev) => !prev);

      toggle(null);
    } catch (err) {
      alert(`Student could not be deleted, try again`);
      console.log(err);
    }
  };
  console.log(student);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
        <p><strong>Id:</strong> {student.sid}</p>
        <p><strong>Name:</strong> {student.FullName}</p>
        <p><strong>Gender:</strong> {student.Gender}</p>
        <p><strong>Dept:</strong> {student.DeptName}</p>
        <p><strong>DOB:</strong> {student.DOB.slice(0,10)}</p>
        <p><strong>Email:</strong> {student.Email}</p>
        <p><strong>Password:</strong> {student.Password}</p>
        <p><strong>Phone:</strong> {student.Phone}</p>
        <p><strong>Address:</strong> {student.Address}</p>
        <p><strong>Blood Group:</strong> {student.Blood}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => toggle(null)}
            className="mr-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Close
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

async function deleteStudent(sid) {
  // Implement the delete logic here
  try {
    await axios.delete(`http://localhost:5000/students/delete/${sid}`);
  } catch (err) {
    console.log(err);
  }
}

export default StudentDetailsModal;