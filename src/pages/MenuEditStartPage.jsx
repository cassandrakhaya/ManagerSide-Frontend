import React from 'react';
import CategoryList from '../components/start/CategoryList.jsx';
import MenuEdit from '../components/start/MenuEdit.jsx';

const MenuStartPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Manager Menu Edit Page</h1>

            {/* CategoryList Dropdown */}
            <CategoryList />

            {/* Space between the two components */}
            <div className="mt-6 w-full max-w-lg">
                <MenuEdit />
            </div>
        </div>
    );
}

export default MenuStartPage;


// import React from 'react';
// import CategoryList from '../components/start/CategoryList.jsx';
// // import MenuEdit from '../components/start/MenuEdit.jsx';

// const MenuStartPage = () => {
//     return (
//         <div>
//             <h1>Manager Menu Edit Page</h1>
//             <CategoryList />
//         </div>
//     );
// }

// export default MenuStartPage;
