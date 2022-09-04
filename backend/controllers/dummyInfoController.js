const catchAsync = require('../utils/catchAsync');
exports.getDummyInfo = catchAsync(async (req, res, next) => {
  const tickets = [
    {
      _id: 1,
      subject: 'm',
      adminID: 1,
      projectID: 1,
      projectName: 'Hello Waer!',
      clientID: 6,
      category: 'waer1',
      attachments: ['1.jpg', '2.jpg', '3.jpg'],
      answer: 'Hello Waer!',
      comments: [
        {
          clientID: 6,
          content: 'Hello Waer!',
        },
        {
          clientID: 1,
          content: 'Hello Waer!',
        },
      ],
      status: 0,
    },
    {
      _id: 2,
      subject: 'm2',
      adminID: 2,
      projectID: 2,
      projectName: 'Hello Waer2!',
      clientID: 7,
      category: 'waer2',
      attachments: ['1.jpg', '2.jpg', '3.jpg'],
      answer: 'Hello Waer2!',
      comments: [
        {
          clientID: 7,
          content: 'Hello Waer2!',
        },
        {
          clientID: 2,
          content: 'Hello Waer2!',
        },
      ],
      status: 1,
    },
    {
      _id: 3,
      subject: 'm3',
      adminID: 3,
      projectID: null,
      projectName: 'Hello Waer3!',
      clientID: 8,
      category: 'waer3',
      attachments: ['1.jpg', '2.jpg', '3.jpg'],
      answer: 'Hello Waer3!',
      comments: [
        {
          clientID: 8,
          content: 'Hello Waer3!',
        },
        {
          clientID: 3,
          content: 'Hello Waer3!',
        },
      ],
      status: 0,
    },
    {
      _id: 4,
      subject: 'm4',
      adminID: 4,
      projectID: 4,
      projectName: 'Hello Waer4!',
      clientID: 9,
      category: 'waer4',
      attachments: ['1.jpg', '2.jpg', '3.jpg'],
      answer: 'Hello Waer4!',
      comments: [
        {
          clientID: 9,
          content: 'Hello Waer4!',
        },
        {
          clientID: 4,
          content: 'Hello Waer9!',
        },
      ],
      status: 1,
    },
    {
      _id: 5,
      subject: 'm5',
      adminID: 5,
      projectID: 5,
      projectName: 'Hello Waer5!',
      clientID: 10,
      category: 'waer5',
      attachments: ['1.jpg', '2.jpg', '3.jpg'],
      answer: 'Hello Waer5!',
      comments: [
        {
          clientID: 10,
          content: 'Hello Waer5!',
        },
        {
          clientID: 5,
          content: 'Hello Waer5!',
        },
      ],
      status: 0,
    },
  ];
  const admins = [
    {
      _id: 1,
      name: 'Waer1',
      photo: '1.jpg',
      birthDate: '2000-12-30',
      email: 'waer1@omAhmed.com',
      companyName: 'Waer1',
      isAdmin: 1,
    },
    {
      _id: 2,
      name: 'Waer2',
      photo: '2.jpg',
      birthDate: '2000-12-30',
      email: 'waer2@omAhmed.com',
      companyName: 'Waer2',
      isAdmin: 1,
    },
    {
      _id: 3,
      name: 'Waer3',
      photo: '3.jpg',
      birthDate: '2000-12-30',
      email: 'waer3@omAhmed.com',
      companyName: 'Waer3',
      isAdmin: 1,
    },
    {
      _id: 4,
      name: 'Waer4',
      photo: '4.jpg',
      birthDate: '2000-12-30',
      email: 'waer4@omAhmed.com',
      companyName: 'Waer4',
      isAdmin: 1,
    },
    {
      _id: 5,
      name: 'Waer5',
      photo: '5.jpg',
      birthDate: '2000-12-30',
      email: 'waer5@omAhmed.com',
      companyName: 'Waer5',
      isAdmin: 1,
    },
  ];
  const clients = [
    {
      _id: 6,
      name: 'Waer6',
      photo: '6.jpg',
      birthDate: '2000-12-30',
      email: 'waer6@omAhmed.com',
      companyName: 'Waer6',
      isAdmin: 0,
    },
    {
      _id: 7,
      name: 'Waer7',
      photo: '7.jpg',
      birthDate: '2000-12-30',
      email: 'waer7@omAhmed.com',
      companyName: 'Waer7',
      isAdmin: 0,
    },
    {
      _id: 8,
      name: 'Waer8',
      photo: '8.jpg',
      birthDate: '2000-12-30',
      email: 'waer8@omAhmed.com',
      companyName: 'Waer8',
      isAdmin: 0,
    },
    {
      _id: 9,
      name: 'Waer9',
      photo: '9.jpg',
      birthDate: '2000-12-30',
      email: 'waer9@omAhmed.com',
      companyName: 'Waer9',
      isAdmin: 0,
    },
    {
      _id: 10,
      name: 'Waer10',
      photo: '10.jpg',
      birthDate: '2000-12-30',
      email: 'waer10@omAhmed.com',
      companyName: 'Waer10',
      isAdmin: 0,
    },
  ];
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tickets.length + clients.length + admins.length,
    data: {
      tickets,
      clients,
      admins,
    },
  });
});

exports.getIsAuth = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: 1,
    data: {
      isAuth: true,
    },
  });
});