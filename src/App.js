import React, { useEffect, useState } from "react";
import { Table, Input, message, Spin } from "antd";

const { Search } = Input;

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://raw.githubusercontent.com/RashitKhamidullin/Educhain-Assignment/refs/heads/main/applications");
            const result = await response.json();
            setData(result);
        } catch (error) {
            message.error("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearchText(value.toLowerCase());
    };

    const filteredData = data.filter(
        (item) =>
            item.applicantName.toLowerCase().includes(searchText) ||
            item.status_En.toLowerCase().includes(searchText) ||
			item.status_Ar.toLowerCase().includes(searchText) ||
            item.studentID.toLowerCase().includes(searchText)
    );

    const columns = [
        { title: "Application No", dataIndex: "applicationNO", sorter: (a, b) => a.applicationNO - b.applicationNO },
        { title: "Applicant Name", dataIndex: "applicantName",sorter: (a, b) => a.applicantName.localeCompare(b.applicantName) },
        { title: "Application Date", dataIndex: "applicationDate",sorter: (a, b) => a.applicationDate.localeCompare(b.applicationDate) },
        { title: "Student ID", dataIndex: "studentID" },
        { title: "Paid Amount", dataIndex: "paidAmount" },
        { title: "Status (English)", dataIndex: "status_En" },
        { title: "Status (Arabic)", dataIndex: "status_Ar" },
        { title: "Last Updated", dataIndex: "lastDate" },
    ];

    return (
        <div>
            <Search placeholder="Search by name, status, or ID" onSearch={handleSearch} style={{ marginBottom: 20 }} />
            {loading ? <Spin /> : <Table pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}} columns={columns} dataSource={filteredData} rowKey="applicationNO" />}
        </div>
    );
};

export default App;
