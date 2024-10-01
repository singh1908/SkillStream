const OngoingTest = () => {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          {/* Placeholder for Icon Image */}
          <div className="w-10 h-10 bg-gray-300 rounded mr-4"></div>
          <div>
            <h3 className="font-bold">Ongoing test</h3>
            <p>General knowledge quiz</p>
            <p>15 May, 2023</p>
            <p>11:00 am - 1:00 pm</p>
          </div>
        </div>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Start test</button>
      </div>
    );
  };
  
  export default OngoingTest;
  