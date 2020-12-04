import React, {useEffect} from "react";

const ThePostContent = ({children}) => {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                document.querySelector(`ul li a[href="#${id}"]`).parentElement.classList.add('toc-active');
            } else {
                document.querySelector(`ul li a[href="#${id}"]`).parentElement.classList.remove('toc-active');
            }
        });
    });

    useEffect(() => {
        const handleContentLoad = () => {
            // Track all sections that have an `id` applied
            document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
                .forEach((section) => {
                    observer.observe(section);
                });
        }

        window.addEventListener('DOMContentLoaded', handleContentLoad)
        return () => window.removeEventListener('DOMContentLoaded', handleContentLoad)
    }, [])

    return children || null
}

export default ThePostContent


