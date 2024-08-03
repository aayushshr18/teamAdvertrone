export const mapNavbarData = (data)=>{
    return {
        header : 'Advertrone Technologies',
        navbarItems : [
            {
                to: '/',
                paths: [''],
                title: 'Dashboard',
                icon: 'home_icon',
                id: 'navitem-1'
            },
            {
                to: '/agents',
                paths: ['agents'],
                title: 'Agent',
                icon: 'employees_icon',
                id: 'navitem-2'
            },
            {
                to: '/leads',
                paths: ['leads'],
                title: 'Lead',
                icon: 'departments_icon',
                id: 'navitem-3'
            },
            {
                to: '/withdraw',
                paths: ['withdraw'],
                title: 'Withdraw',
                icon: 'projects_icon',
                id: 'navitem-4'
            },
        ],
        employeeName: data?.name ?? '😎'
    }
}