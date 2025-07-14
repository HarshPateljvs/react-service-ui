
export default function StudentHome() {
  return (
    <>
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="text-gray-500">Welcome to Tailwind CSS</p>
      <div className="p-4 m-2">Padding and Margin</div>
      <div className="flex justify-between items-center">
        <div>Item 1</div>
        <div>Item 2</div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow">Button</div>
    </>
  );
}
