import axios from 'axios';
import { useEffect, useState } from 'react';
import { hashCode, IEmployeeDetails, OrganizationChart } from '../../OrgChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserAlt } from '@fortawesome/free-solid-svg-icons';

import './Overview.scss';

const Overview = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [employeeName, setEmployeeName] = useState<string>();
  const [subordinateNames, setSubordinateNames] = useState<string[]>([]);

  const fetchEmployeeDetails = async (employeeName: string) => {
    const response = await axios.get(
      `http://api.additivasia.io/api/v1/assignment/employees/${employeeName}`,
    );

    return {
      name: employeeName,
      title: response.data[0],
      directSubordinates: response.data[1]
        ? response.data[1]['direct-subordinates']
        : null,
    } as IEmployeeDetails;
  };

  useEffect(() => {
    const { href } = window.location;
    const employeeName = href.substring(href.lastIndexOf('/') + 1);

    const getDirectSubordinateDetails = async (
      employeeDetails: IEmployeeDetails,
      chart: OrganizationChart,
    ) => {
      if (
        employeeDetails.directSubordinates &&
        employeeDetails.directSubordinates.length
      ) {
        for (let i = 0; i < employeeDetails.directSubordinates.length; i++) {
          const employee = await fetchEmployeeDetails(
            employeeDetails.directSubordinates[i],
          );

          chart.add(
            employee,
            hashCode(`${employeeDetails.name}__${employeeDetails.title}`),
            chart.traverseBF,
          );

          await getDirectSubordinateDetails(employee, chart);
        }
      }
    };

    const generateOrganizationChart = async () => {
      try {
        const employeeDetails = await fetchEmployeeDetails(employeeName);
        const chart = new OrganizationChart(employeeDetails);
        await getDirectSubordinateDetails(employeeDetails, chart);

        setEmployeeName(employeeName);
        setSubordinateNames(chart.getAllSubordinateNames());
        setLoading(false);
        setError('');
      } catch (error) {
        setEmployeeName('');
        setSubordinateNames([]);
        setLoading(false);
        setError(
          error.response && error.response.status === 404
            ? `Employee ${unescape(employeeName)} not found`
            : 'Something went wrong!',
        );
      }
    };

    generateOrganizationChart();
  }, []);

  return (
    <div className="overview">
      {loading ? (
        'Loading'
      ) : (
        <div>
          <div className="back_button">
            <a href="/explorer">
              {' '}
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to explorer
            </a>
          </div>
          <h4>Employee Overview</h4>
          {employeeName && subordinateNames && (
            <div>
              <div>Subordinates of employee {unescape(employeeName)}</div>
              <div className="subordinates-list">
                {subordinateNames.length
                  ? subordinateNames.map((subordinateName) => (
                      <div
                        key={subordinateName.toLowerCase()}
                        className="subordinates-list__item"
                      >
                        <a href={`/overview/${subordinateName}`}>
                          <FontAwesomeIcon icon={faUserAlt} />
                          {subordinateName}
                        </a>
                      </div>
                    ))
                  : 'None'}
              </div>
            </div>
          )}
        </div>
      )}
      {error ? error : null}
    </div>
  );
};

export default Overview;
