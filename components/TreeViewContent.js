// import React from 'react'
// import { TreeView } from '@progress/kendo-react-treeview';

// const tree = [{
//     text: 'Furniture', expanded: true, items: [
//         { text: 'Tables & Chairs' }, { text: 'Sofas' }, { text: 'Occasional Furniture' }]
// }, {
//     text: 'Decor', items: [
//         { text: 'Bed Linen' }, { text: 'Curtains & Blinds' }, { text: 'Carpets' }]
// }];


// const TreeViewContent = () => {

//     const onItemClick = (event) => {
//         event.item.selected = !event.item.selected;
//         this.forceUpdate();
//     }
    
//     const onExpandChange = (event) => {
//         event.item.expanded = !event.item.expanded;
//         this.forceUpdate();
//     }

//     return (
//         <TreeView
//                 data={tree}
//                 expandIcons={true}
//                 onExpandChange={onExpandChange}
//                 onItemClick={onItemClick}
//                 aria-multiselectable={true}
//             />
//     )
// }

// export default TreeViewContent;