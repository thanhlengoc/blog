import React from 'react'
import {Pagination} from "react-bootstrap";

const Paging = () => {
    return (
        <div className="d-flex justify-content-center">
            <Pagination size="sm">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    )
}

export default Paging