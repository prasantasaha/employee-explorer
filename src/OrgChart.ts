export interface IEmployeeDetails {
    name: string;
    title: string,
    directSubordinates: string[];
}

class Employee {
    public id: number;
    public reportsTo: Employee | null;
    public readonly manages: Employee[];
    public details: IEmployeeDetails

    constructor(details: IEmployeeDetails) {
        this.id = hashCode(`${details.name}__${details.title}`)
        this.details = details;
        this.reportsTo = null;
        this.manages = [];
    }
}

class OrganizationChart {
    private root: Employee;
    constructor(employeeDetails: IEmployeeDetails) {
        this.root = new Employee(employeeDetails);
    }

    public traverseDF(callback: (employee: Employee) => void): void {
        (function recurse(employee) {
            for (var i = 0, length = employee.manages.length; i < length; i++) {

                recurse(employee.manages[i]);
            }
            callback(employee);
        })(this.root);

    }

    public traverseBF(callback: (employee: Employee) => void): void {
        var queue = new Queue();
        queue.enqueue(this.root);
        let employee = queue.dequeue();

        while (employee) {
            for (var i = 0, length = employee.manages.length; i < length; i++) {
                queue.enqueue(employee.manages[i]);
            }

            callback(employee);
            employee = queue.dequeue();
        }
    };

    private contains(callback: any, traversal: any): void {
        traversal.call(this, callback);
    };

    public add(employeeDetails: IEmployeeDetails, managerId: number, traversal: (callback: (employee: Employee) => void) => void) {
        const child = new Employee(employeeDetails);
        let reportsTo: any;

        this.contains((employee: Employee) => {
            if (employee.id === managerId) {
                reportsTo = employee;
            }
        }, traversal);

        if (reportsTo && reportsTo instanceof Employee) {
            reportsTo.manages.push(child);
            child.reportsTo = reportsTo;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        }
    };

    public getAllSubordinateNames(): string[] {
        const subordinateNames: Set<string> = new Set();
        this.traverseBF((employee: Employee) => {
            subordinateNames.add(employee.details.name);
        });
        subordinateNames.delete(this.root.details.name);

        return Array.from(subordinateNames);
    }

}

class Queue {
    private elements: Employee[]
    constructor() {
        this.elements = [];
    }

    public enqueue(employee: Employee) {
        this.elements.push(employee);
    }

    public dequeue() {
        return this.elements.shift();
    }
}

const hashCode = (str: string) => {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
}



export {
    Employee,
    OrganizationChart,
    hashCode
}