const TotalAttempts = () => {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="font-bold">Total Attempts</h3>
        <p>Weekly test: 25/28 (3 missed)</p>
        <p>Monthly: 30/32 (2 missed)</p>
        <p>Quiz: 45/45</p>
        <p>Questionnaires: 56/60 (4 missed)</p>
        <p>Tests: 39/45</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">See test results</button>
      </div>
    );
  };
  
  export default TotalAttempts;
  