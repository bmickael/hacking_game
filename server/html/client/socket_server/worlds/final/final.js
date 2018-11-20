var world =
[
	{
		"winningCondition":
		[
			""
		],
		"hint": "Try talking with Admin",
		"goal": "Log in.",
		"cmdList":
		[
			["cat", "cat filename : display content of file"],
			["ls", "ls : list all files on the current folder"],
			["cd", "cd directory : change directory. Type \"cd ..\" to go back to parent directory"],
			["pwd", "pwd : print name of current directory"],
			["roll"],
			["help"],
			["ssh", "ssh : connect to another computer"],
			["exit", "exit : exit ssh session"],
			["hint"],
			["whois"]
		],
		"social":
		[
			{
				"name": "root",
				"password": "root",
				"mail":
				[
					{
						"sender": "0",
						"from_to": "Admin 42",
						"title": "Welcome",
						"text": "Welcome to 42 ! We hope you'll enjoy staying with us. Are you born to hack ? Please visit our website for more info : www.42.fr"
					}
				]
			},
			{
				"name": "Admin",
				"password": "Admin",
				"exchange":
				[
					{
						"q":"Hey, it's been a long time. I changed your computer login and password to 'root'. Try to log in terminal.",
						"r":["Got it", "What next ?"],
						"i":["1", "1"]
					},
					{
						"q":"Talk to Marvin when you're done. he has something to tell you.",
						"r": ["Okay, thank you"],
						"i":["2"],
						"s": ["Credentials", "You can get access to your computer using root/root."],
						"w": "1"
					},
					{
						"q":"Good luck !",
						"r":[]
					}
				]
			}
		]
	},
	{
		"winningCondition":
		[
			"help"
		],
		"goal": "Display available commands in terminal.",
		"hint": "Type 'help' in terminal to display available commands.",
		"cmdList":
		[
			["cat","cat filename : display content of file"],
			["ls", "ls : list all files on the current folder"],
			["cd", "cd directory : change directory. Type \"cd ..\" to go back to parent directory"],
			["pwd", "pwd : print name of current directory"],
			["roll"],
			["help"],
			["ssh", "ssh : connect to another computer"],
			["exit", "exit : exit ssh session"],
			["hint"]
		],
		"social":
		[
			{
				"name": "Marvin",
				"password": "toto",
				"exchange":
				[
					{
						"q":"Hey !",
						"r":["Hi, you want to tell me something?", "I heard you want to talk to me."],
						"i":["1", "1"]
					},
					{
						"q":"That's true but first, let's review the basics. The 'help' command display all available commands in terminal. Don't hesitate to use it when you're stuck.",
						"r": ["Got it"],
						"i":["2"]
					},
					{
						"q":"Really ? Let's try it.",
						"r":[]
					}
				]
			}
		]
	},
	{
		"winningCondition":
		[
			"ls"
		],
		"goal": "Display files in current directory.",
		"hint": "Type ls in terminal",
		"cmdList":
		[
			["cat","cat filename : display content of file"],
			["cd", "cd directory : change directory. Type \"cd ..\" to go back to parent directory"],
			["ls", "ls : list all files on the current folder"],
			["pwd", "pwd : print name of current directory"],
			["roll"],
			["help"],
			["ssh", "ssh : connect to another computer"],
			["exit", "exit : exit ssh session"],
			["hint"]
		],
		"social":
		[
			{
				"name": "Marvin",
				"exchange":
				[
					{
						"q": "Good ! One last thing : you can check your current goal in your Diary. If you're really stuck, type 'hint'. But don't overdo it !",
						"r": ["I understand."],
						"i": ["1"]
					},
					{
						"q": "Ok, now you're all set. I received an e-mail from 42, I copied the content in a file in your computer. Just go and read it.",
						"r": []
					}
				]
			}
		]
	},
	{
		"winningCondition":
		[
			"cat mission.txt",
			"/Missions"
		],
		"goal": "Locate and read Marvin's file.",
		"hint": "Try using cat to read a file.",
		"cmdList":
		[
			["cat","cat filename : display content of file"],
			["cd", "cd directory : change directory. Type \"cd ..\" to go back to parent directory"],
			["ls", "ls : list all files on the current folder"],
			["pwd", "pwd : print name of current directory"],
			["roll"],
			["help"],
			["ssh", "ssh : connect to another computer"],
			["exit", "exit : exit ssh session"],
			["hint"]
		],
		"social":
		[]
	},
	{
		"winningCondition":
		[
			"cat .macaron.txt",
			"/.Students"
		],
		"goal": "Find information about the mysterious student.",
		"hint": "Use the browser to gather information about 42.",
		"cmdList":
		[
			["cat","cat filename : display content of file"],
			["cd", "cd directory : change directory. Type \"cd ..\" to go back to parent directory"],
			["ls", "ls : list all files on the current folder. Option -a : display hidden files."],
			["pwd", "pwd : print name of current directory"],
			["roll"],
			["help"],
			["ssh", "ssh : connect to another computer"],
			["exit", "exit : exit ssh session"]
		],
		"social":
		[]
	},
	{
		"winningCondition":
		["whois 5.5.5.5"],
		"goal": "Find information about Mac Aron's location.",
		"hint": "Try using whois in your terminal",
		"cmdList":
		[
			["cat","cat filename : display content of file"],
			["cd", "cd directory : change directory. Type \"cd ..\" to go back to parent directory"],
			["ls", "ls : list all files on the current folder. Option -a : display hidden files."],
			["pwd", "pwd : print name of current directory"],
			["roll"],
			["help"],
			["ssh", "ssh : connect to another computer"],
			["exit", "exit : exit ssh session"],
			["whois", "whois ipaddress : give info on a ip address"],
			["hint"]
		],
		"social":
		[
			{
			"name": "Marvin",
			"password": "toto",
			"exchange":
				[
					{
						"q":"Did you see that ? He even beat you. This guy is awesome... What do you think ?",
						"r":["He's a genius", "He's a cheater"],
						"i":["1", "1"]
					},
					{
						"q":"Well, maybe you're right, You know what an ip is, right ?",
						"r": ["A what ?", "Yeah, sure"],
						"i":["2", "3"]
					},
					{
						"q":"No worries. I let you some doc on your PC. Everything you need is explained in there.",
						"r":[]
					},
					{
						"q":"Ok, then you can exit ssh and go back to your desktop. I left you some explanations there.",
						"r": []
					}
				]
		}
		],
		"updateFiles":
			[
				["A", "rot", "Programs", false, "Cannot open rot. Try using rot"],
				["A", "Doc", "/", true, null],
				["A", "ip.txt", "Doc", false, "An IP address, or simply an \"IP,\" is a unique address that identifies a device on the Internet or a local network. An IP address consist of four sets of numbers from 0 to 255, separated by three dots."],
				["A", "whois.txt", "Doc", false, "whois is a command that is used to find the details of a domain name or an IP address. Example : whois 8.8.8.8"]
			]
	},
	{
		"winningCondition":
		[""],
		"goal": "Access to BIG's CEO e-mail.",
		"hint": "Try looking at his facebook page to gather some hints",
		"social": [
			{
				"name": "john@mail.com",
				"password": "12121980",
				"mail":
					[
						{
							"sender": "0",
							"from_to": "Lewis",
							"title": "Schedule",
							"text": "Hello",
							"s": ["INFO", "You learnt valuable information about the BIG company."],
							"w":"1"
						},
						{
							"sender": "0",
							"from_to": "RepairCenter",
							"title": "Your monthly invoice",
							"text": "Your address : 49 Summer Street</br></br>Dear Customer,</br> Thank you for using our services. Please find enclosed our monthly invoice.</br> Any problem ? Please call our emergency number: 888-3490.<br/></br>RepairCenter Miami<br/>RepairCenter : All your needs for computer maintenance all over the US !"
						},
						{
							"sender": "1",
							"from_to": "",
							"title": "Schedule",
							"text": "Hello"
						}
					]
			}
		],
		"cmdList":
		[
			["cat", "cat filename : display content of file"],
			["cd", "cd directory : change directory. Type \"cd ..\" to go back to parent directory"],
			["ls", "ls : list all files on the current folder. Option -a : display hidden files."],
			["pwd", "pwd : print name of current directory"],
			["roll"],
			["help"],
			["rot", "rot : replaces all letters of a word with the n-th letter after it"],
			["ssh", "ssh : connect to another computer"],
			["exit", "exit", "exit : exit ssh session"],
			["whois", "whois ipaddress : give info on a ip address"],
			["hint"]
		]
	},
	{
		"winningCondition": ["pwd"],
		"goal": "toto",
		"hint": "Try looking at his facebook page to gather some hints",
		"cmdList":
		[
			["cat", "cat filename : display content of file"],
			["cd", "cd directory : change directory. Type \"cd ..\" to go back to parent directory"],
			["ls", "ls : list all files on the current folder. Option -a : display hidden files."],
			["pwd", "pwd : print name of current directory"],
			["rot", "rot : replaces all letters of a word with the n-th letter after it"],
			["roll"],
			["help"],
			["ssh", "ssh : connect to another computer"],
			["exit", "exit", "exit : exit ssh session"],
			["hint"]
		],
		"social":
		[
			{
				"name": "RepairCenter Miami",
				"exchange":
				[
					{
						"q": "RepairCenter Miami, Robin speaking.",
						"r": ["Hello, I'm your boss.", "Hello, my name is Taylor Green."],
						"i": ["1", "2"]
					},
					{
						"q": "What ? What are you talking about, my boss is right next to me. Stop your stupid pranks !",
						"r": [],
						"i":["0"]
					},
					{
						"q": "Sorry, who are you ?",
						"r": ["I'm from the invoice department at your New York Branch.", "I'm from the sales department at your London branch."],
						"i": ["3", "4"]
					},
					{
						"q": "I see, What can I do for you ?",
						"r": ["I cannot use my computer... I opened an e-mail attachment and everything crashed down."],
						"i": ["5", "6"]
					},
					{
						"q": "What ? We don't have any branches abroad. I'm calling the security.",
						"r": [],
						"i": ["0"]
					},
					{
						"q": "Oh yeah, I understand... Same thing happened to me last month. How can I help you Taylor ?",
						"r": ["Well I have a important woman on hold who ask information about a client. Name of the company is BIG"],
						"i": ["6"]
					},
					{
						"q": "Ok, you got the address ?",
						"r": ["445, Winter Lane", "49, Summer Street", "34, Spring Bld"],
						"i": ["8", "7", "8"]
					},
					{
						"q": "Let's see.... The client number is #1520. Have a good day !",
						"r": [],
					},
					{
						"q": "Sorry, this address doesn't match any client in our database. I can't help you.",
						"r": [],
						"i": ["0"]
					}
				]
			}
		]
	},
	{
		"winningCondition": ["pwd"],
		"goal": "toto",
		"hint": "Try looking at his facebook page to gather some hints",
		"cmdList":
			[
				["cat", "cat filename : display content of file"],
				["cd", "cd directory : change directory. Type \"cd ..\" to go back to parent directory"],
				["ls", "ls : list all files on the current folder. Option -a : display hidden files."],
				["pwd", "pwd : print name of current directory"],
				["rot", "rot : replaces all letters of a word with the n-th letter after it"],
				["roll"],
				["help"],
				["ssh", "ssh : connect to another computer"],
				["exit", "exit", "exit : exit ssh session"],
				["hint"]
			],
		"social":
			[
				{
					"name": "RepairCenter Miami",
					"exchange":
						[
							{
								"q": "RepairCenter Miami, Robin speaking.",
								"r": ["Hello, I'm your boss.", "Hello, my name is Taylor Green."],
								"i": ["1", "2"]
							},
							{
								"q": "What ? What are you talking about, my boss is right next to me. Stop your stupid pranks !",
								"r": [],
								"i":["0"]
							},
							{
								"q": "Sorry, who are you ?",
								"r": ["I'm from the invoice department at your New York Branch.", "I'm from the sales department at your London branch."],
								"i": ["3", "4"]
							},
							{
								"q": "I see, What can I do for you ?",
								"r": ["I cannot use my computer... I opened an e-mail attachment and everything crashed down."],
								"i": ["5", "6"]
							},
							{
								"q": "What ? We don't have any branches abroad. I'm calling the security.",
								"r": [],
								"i": ["0"]
							},
							{
								"q": "Oh yeah, I understand... Same thing happened to me last month. How can I help you Taylor ?",
								"r": ["Well I have a important woman on hold who ask information about a client. Name of the company is BIG"],
								"i": ["6"]
							},
							{
								"q": "Ok, you got the address ?",
								"r": ["445, Winter Lane", "49, Summer Street", "34, Spring Bld"],
								"i": ["8", "7", "8"]
							},
							{
								"q": "Let's see.... The client number is #1520. Have a good day !",
								"r": [],
							},
							{
								"q": "Sorry, this address doesn't match any client in our database. I can't help you.",
								"r": [],
								"i": ["0"]
							}
						]
				}
			]
	}
]