export const time_conflict = (course, courses, coursedata) => {
    let flag = false;
    if (coursedata[course].meets.length === 0){
        return flag;
    }

    for (let i = 0; i < courses.length; i++) {
        if (course === courses[i]) {
            continue;
        }

        if (coursedata[courses[i]].meets.length === 0) {
            continue;
        }

        let course1 = coursedata[course];
        let course2 = coursedata[courses[i]];

        if (course1.term !== course2.term) {
            continue;
        }

        let days_match =  false;

        let days1 = course1.meets.split(" ")[0];
        let days2 = course2.meets.split(" ")[0];

        const days = ["M", "Tu", "W", "Th", "F"];

        for (let d = 0; d < 5; d++) {
            if (days1.includes(days[d]) && days2.includes(days[d])) {
                days_match = true;
                break;
            }
        }

        if (!days_match) {
            continue;
        }

        let time1 = course1.meets.split(" ")[1];
        let time2 = course2.meets.split(" ")[1];

        let start1 = time1.split("-")[0];
        let end1 = time1.split("-")[1];

        let start2 = time2.split("-")[0];
        let end2 = time2.split("-")[1];

        if (start1 <= end2 && start2 <= end1){
            flag = true;
            break;
        }

        if (start2 <= end1 && start1 <= end2){
            flag = true;
            break;
        }
    }

    return flag;

}