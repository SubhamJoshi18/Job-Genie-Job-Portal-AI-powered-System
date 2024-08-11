/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

const footerNavElements = [
  {
    id: 1,
    title: "Explores",
    Element: [
      {
        data1: "Communities",
        data2: "Recuiter",
        data3: "Jobs",
        data4: "Events",
        data5: "Forum",
        link1: "https://www.youtube.com",
        link2: "",
        link3: "",
        link4: "",
        link5: "",
      },
    ],
  },
  {
    id: 2,
    title: "Hire Learning",
    Element: [
      {
        data1: "Articles",
        data2: "Guides",
        data3: "Templates",
        data4: "Reports",
        data5: "Courses",
        link1: "",
        link2: "",
        link3: "",
        link4: "",
        link5: "",
      },
    ],
  },
  {
    id: 3,
    title: "Resources",
    Element: [
      {
        data1: "Blogs",
        data2: "Podcast",
        data3: "Content library",
        link1: "",
        link2: "",
        link3: "",
      },
    ],
  },
  {
    id: 4,
    title: "Product",
    Element: [
      {
        data1: "Attract",
        data2: "Quality",
        data3: "Hire",
        data4: "Pricing",
        data5: "Customers",
        data6: "Partners",
        link1: "",
        link2: "",
        link3: "",
        link4: "",
        link5: "",
        link6: "",
      },
    ],
  },
  {
    id: 5,
    title: "Support",
    Element: [
      {
        data1: "Help center",
        data2: "Developer API",
        data3: "Status",
        link1: "",
        link2: "",
        link3: "",
      },
    ],
  },
  {
    id: 6,
    title: "For job seekers",
    Element: [
      {
        data1: "Go pro",
        data2: "Code of onduct",
        data3: "Financial statement",
        data4: "Press release",
        data5: "Prospectus",
        link1: "",
        link2: "",
        link3: "",
        link4: "",
        link5: "",
      },
    ],
  },
  {
    id: 7,
    title: "Integrations",
    Element: [
      {
        data1: "Slack",
        data2: "Xero",
        data3: "1 Password",
        data4: "Sage",
        data5: "Netsuite",
        link1: "",
        link2: "",
        link3: "",
        link4: "",
        link5: "",
      },
    ],
  },
  {
    id: 8,
    title: "Solutions",
    Element: [
      {
        data1: "Human resources",
        data2: "Sales & marketing",
        data3: "Financial",
        data4: "Investor",
        data5: "Revenue",
        link1: "",
        link2: "",
        link3: "",
        link4: "",
        link5: "",
      },
    ],
  },
  {
    id: 9,
    title: "Company",
    Element: [
      {
        data1: "About",
        data2: "User",
        data3: "Teams",
        data4: "Contact",
        link1: "",
        link2: "",
        link3: "",
        link4: "",
      },
    ],
  },
  {
    id: 10,
    title: "Policies",
    Element: [
      {
        data1: "Community guidelines",
        data2: "Terms of use",
        data3: "Privacy policy",
        data4: "Legal cookies",
        link1: "",
        link2: "",
        link3: "",
        link4: "",
      },
    ],
  },
];
export const FooterNav = () => {
  return (
    <>
      <div className="container mx-auto flex justify-center my-10 px-16">
        <ul className="grid-cols-5 grid gap-x-20 gap-y-12">
          {footerNavElements.map((item) => (
            <li key={item.id}>
              <div>
                <h1 className="font-bold mb-2">{item.title}</h1>
                {/* <ul>
                  {item.Element.map((el, index) =>
                    Object.values(el).map((value) => (
                      <li
                        key={index}
                        className="mb-1 hover:text-gray-500/70 text-gray-500"
                      >
                        <Link to={}>{value}</Link>
                      </li>
                    ))
                  )}
                </ul> */}
                <ul>
                  {item.Element.map((el) => {
                    const dataKeys = Object.keys(el).filter((key) =>
                      key.startsWith("data")
                    );
                    const linkKeys = Object.keys(el).filter((key) =>
                      key.startsWith("link")
                    );

                    return dataKeys.map((dataKey, i) => (
                      <li
                        key={i}
                        className="mb-1 hover:text-gray-500/70 text-gray-500"
                      >
                        <Link to={(el as any)[linkKeys[i]]}>
                          {(el as any)[dataKey]}
                        </Link>
                      </li>
                    ));
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
