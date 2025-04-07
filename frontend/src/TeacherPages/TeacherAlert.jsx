const TestAlertBox = () => {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          {/* Placeholder for Clock Image */}
          <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <h2 className="text-lg font-bold">You have a test arriving soon!!</h2>
            <p>Test: General knowledge quiz</p>
            <p>Date: 15 May, 2023</p>
            <p>Time: 11:00 am - 1:00 pm</p>
          </div>
        </div>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Set reminder</button>
      </div>
    );
  };
  
  export default TestAlertBox;
  