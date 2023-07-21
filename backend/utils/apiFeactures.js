class ApiFeactures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword= this.queryStr.keyword ? {
            name : {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {};
        console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = { ...this.queryStr };
        console.log(queryCopy);
        //removing some filds for category
        const removeFields = ['keyword','page','limit'];
        removeFields.forEach((key)=> delete queryCopy[key]);
        console.log(queryCopy);

        //filter for priceing and rating
        let queryStr = JSON.stringify(queryCopy); //convert to string
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , (key)=>`$${key}`); 
        //put thr doller sign before gt,gte,lt,and lte for filtering price (mongodb)

        this.query = this.query.find(JSON.parse(queryStr)); //find the query as well as convert to object
        console.log(queryStr);
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1 ; //bcz page is string we convert to number which comes in query

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        console.log(this.queryStr);
        return this;

    }
}

module.exports = ApiFeactures;