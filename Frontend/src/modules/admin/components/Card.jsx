import Profile from "../../../images/Profile.jpg"

const Card = ({ faculty }) => {
  const { FullName, Gender, Qualification, Experience, FacultyId, Designation } = faculty;
  return (
    <>
      <div className="group cursor-pointer relative rounded-3xl space-y-6 overflow-hidden">
        <img
          className="mx-auto h-[26rem] w-full object-cover object-top transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          src={Profile}
          alt="faculty profile pic"
          loading="lazy"
          width="640"
          height="805"
        />
        <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-gray-800 dark:bg-gray-800 translate-y-24 transition duration-300 ease-in-out group-hover:translate-y-0">
          <div>
            <h4 className="text-xl font-semibold text-white dark:text-gray-300">
              {FullName} <span className="text-sm">{Designation}</span>
            </h4>
            <span className="block text-sm text-gray-500 dark:text-gray-400">{Gender}</span>
          </div>
          <div className="mt-8 text-lg text-gray-300 dark:text-gray-500">
            <div>
              Faculty Number: {FacultyId}
            </div>
            <div>
              {Experience} years of Experience.
            </div>
            <div>
              Qualifications: {Qualification}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;