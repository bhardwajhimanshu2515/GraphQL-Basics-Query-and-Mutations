const graphql=require("graphql");

const {
GraphQLObjectType,
GraphQLID,
GraphQLString,
GraphQLInt,
GraphQLSchema,
GraphQLList
}=graphql;

//userData
var userData=[
    {id:"1",name:"Himanshu",age:21,professional:"engineer"},
    {id:"2",name:"Shubhangi",age:21,professional:"engineer"},
    {id:"3",name:"Abhitendra",age:20,professional:"scientist"},
    {id:"4",name:"Sandeep",age:20,professional:"banker"},
    {id:"5",name:"Ambesh",age:23,professional:"business man"},
    {id:"6",name:"Risabh",age:24,professional:"student"},
    {id:"7",name:"Gaurav",age:20,professional:"student"}
];

//hobbies data
var hobbiesData=[
    {id:"1",title:"gym",description:"biceps",userId:"1"},
    {id:"2",title:"running",description:"cardio",userId:"2"},
    {id:"3",title:"cardio",description:"abs",userId:"3"},
    {id:"4",title:"reading",description:"reading books",userId:"4"},
    {id:"5",title:"listening",description:"listening to music",userId:"5"},
    {id:"6",title:"watching",description:"watching movie",userId:"6"},
    {id:"7",title:"gym",description:"triceps",userId:"6"}
]

//post data
var postData=[
    {id:"1",comment:"nice",userId:"2"},
    {id:"2",comment:"good",userId:"1"},
    {id:"3",comment:"excellent",userId:"3"},
]

//create types
const userType=new GraphQLObjectType({
    name:'User',
    description:'Documentation for user',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        professional:{type:GraphQLString},
        posts:{
            type:new GraphQLList(postType),
            resolve(parent,args){
                let res=[];
                for(i=0;i<postData.length;i++){
                    if(parent.id===postData[i].userId){
                        res.push(postData[i])
                    }
                }
                return res;
            }
        },
        hobbies:{
            type: new GraphQLList(hobbyType),
            resolve(parent,args){
                let res=[];
                for(i=0;i<hobbiesData.length;i++){
                    if(parent.id===hobbiesData[i].userId){
                        res.push(hobbiesData[i])
                    }
                }
                return res;
            }
        }
    })
});

//hobby type
const hobbyType=new GraphQLObjectType({
    name:'Hobby',
    description:'Hobby description',
    fields:()=>({
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        description:{type:GraphQLString},
        user:{
            type:userType,
            resolve(parent,args){
                let res;
                for(i=0;i<userData.length;i++){
                    if(parent.userId===userData[i].id){
                        res=userData[i]
                    }
                }
                return res;
            }
        }
    })
})

//post type
const postType=new GraphQLObjectType({
    name:'Post',
    description:'Post description',
    fields:()=>({
        id:{type:GraphQLID},
        comment:{type:GraphQLString},
        user:{
            type:userType,
            resolve(parent,args){
                var res;
                for(let i=0;i<userData.length;i++){
                    if(parent.userId===userData[i].id){
                        res=userData[i]
                    }
                }
                return res;
            }
        }
    })
})

//RootQuery
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    description:"Description for RootQueryType",
    fields:()=>({
        user:{
            type:userType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                var res;
                for(let i=0;i<userData.length;i++){
                    if(args.id===userData[i].id){
                        res=userData[i]
                    }
                }
                return res;
            }
        },
        users:{
            type:new GraphQLList(userType),
            args:{},
            resolve(parent,args){
                return userData;
            }
        },
        hobby:{
            type:hobbyType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                var res;
                for(let i=0;i<hobbiesData.length;i++){
                    if(args.id===hobbiesData[i].id){
                        res=hobbiesData[i]
                    }
                }
                return res;
            }
        },
        hobbies:{
            type:new GraphQLList(hobbyType),
            args:{},
            resolve(parent,args){
                return hobbiesData;
            }
        },
        post:{
            type:postType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                var res;
                for(let i=0;i<postData.length;i++){
                    if(args.id===postData[i].id){
                        res=postData[i]
                    }
                }
                return res;
            }
        },
        posts:{
            type:new GraphQLList(postType),
            args:{},
            resolve(parent,args){
                return postData;
            }
        }
    })
});

//Mutations
const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:()=>({
        createUser:{
            type:userType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt},
                professional:{type:GraphQLString}
            },
            resolve(parent,args){
                let user={
                    name:args.name,
                    age:args.age,
                    professional:args.professional
                }
                return user;
            }
        },
        createPost:{
            type:postType,
            args:{
                comment:{type:GraphQLString},
                userId:{type:GraphQLID}
            },
            resolve(parent,args){
                let post={
                    comment:args.comment,
                    userId:args.userId
                };
                return post;
            }
        },
        createHobby:{
            type:hobbyType,
            args:{
                title:{type:GraphQLString},
                description:{type:GraphQLString},
                userId:{type:GraphQLID}
            },
            resolve(parent,args){
                let hobby={
                    title:args.title,
                    description:args.description,
                    userId:args.userId
                }
                return hobby;
            }
        }
    })
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});