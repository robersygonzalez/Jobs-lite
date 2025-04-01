import { useDispatch } from 'react-redux'
import { ShowLoading, HideLoading } from '../redux/alertSlice'
import { getAllJobs } from '../pages/apis/jobs'
import { message } from 'antd'

const Filters = ({ filters, setFilters, setData }) => {
    const dispatch = useDispatch()
    const filterData = async (filters) => {
        try {
            dispatch(ShowLoading())
            const response = await getAllJobs(filters)
            if (response.success) {
                const approvedJobs = response.data.filter(job => job.status === 'approved')
                setData(approvedJobs)
            } else {
                message.error(response.message)
            }
            setFilters(filters)
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    return (
        <div>
            <div className='d-flex justify-content-start gap-2'>
                <select
                    name=""
                    id=""
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                    <option value="">Location</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
                <select
                    name=""
                    id=""
                    value={filters.industry}
                    onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                >
                    <option value="">Industry</option>
                    <option value="it">IT</option>
                    <option value="finance">Finance</option>
                    <option value="marketing">Marketing</option>
                    <option value="realestate">Real Estate</option>
                </select>
                <select
                    name=""
                    id=""
                    value={filters.experience}
                    onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                >
                    <option value="">Experience</option>
                    <option value="0-1">0-1 Years</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="5-10">5-10 Years</option>
                </select>
                <button
                    className='primary-outlined-btn'
                    onClick={() => filterData({
                        location: "",
                        industry: "",
                        experience: ""
                    })}
                >
                    Clear
                </button>
                <button
                    className='primary-contained-btn'
                    onClick={() => filterData(filters)}  // Replace with actual filter logic
                >
                    Filter
                </button>
            </div>
        </div>
    )
}

export default Filters
