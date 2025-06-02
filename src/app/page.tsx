"use client";
import AdvocateCard from "@/app/components/AdvocateCard";
import styles from "@/app/advocates/AdvocateTable.module.css"; // optional for search styling
import { useEffect, useState } from "react";
import orderBy from "lodash.orderby";

/* Notes
 * Fixed missing <tr> tags in thead that was causing hydration error initially
 * Added Advocate Id to table rows as key
 * Switched to state-driven rendering to not use document.getElementById(), should use useState
 * Made searching case-insensitive and updated to handle null/undefined
 * Added error catching around api retrieval
 * Changed filter map to normalize search terms to lower case
 * Changed filter map to change years to string for comparison
 * Changed filter map to better search specialties
 * Changed reset to clear input box
 * Added Sort by box which leverages lodash to sort, defaulting to asc
 */
export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates")
        .then((response) =>  response.json())
        .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      })
      .catch((err) => console.error("Failed to fetch advocates", err));
    }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    //Not needed since switched to react way of doing things
    //document.getElementById("search-term").innerHTML = searchTerm;

    const lowerTerm = searchTerm.toLowerCase();
    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName?.toLocaleLowerCase().includes(lowerTerm) ||
        advocate.lastName?.toLocaleLowerCase().includes(lowerTerm) ||
        advocate.city?.toLocaleLowerCase().includes(lowerTerm) ||
        advocate.degree?.toLocaleLowerCase().includes(lowerTerm) ||
        advocate.specialties?.some((s) => s.toLowerCase().includes(lowerTerm)) ||
        //advocate.specialties?.toLocaleLowerCase().includes(lowerTerm) ||
        advocate.yearsOfExperience?.toString().includes(lowerTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClickReset = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
    setSortBy('');
    setSortOrder('asc');
  };

  const sortedAdvocates = sortBy
      ? orderBy(filteredAdvocates, [sortBy], [sortOrder])
      : filteredAdvocates;

  return (
      <main className={styles.container}>
        <h1 className={styles.heading}>Solace Advocates</h1>
        <div className={styles.searchContainer}>
          <label htmlFor="search" className={styles.searchLabel}>Search Advocates</label>
          <div className={styles.searchInputGroup}>
            <input
                id="search"
                className={styles.input}
                value={searchTerm}
                onChange={onChange}
                placeholder="Search by name, city, or specialty..."
            />
            <button onClick={onClickReset} className={styles.button}>Reset</button>

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.select}
            >
              <option value="">Sort by...</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="city">City</option>
              <option value="degree">Degree</option>
              <option value="yearsOfExperience">Years of Experience</option>
            </select>
            <button
                type="button"
                onClick={() =>
                    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                }
                className={styles.button}
            >
              {sortOrder === 'asc' ? '⬆️ Asc' : '⬇️ Desc'}
            </button>
          </div>
          <p className={styles.searchStatus}>
            Showing results for: <strong>{searchTerm || "All"}</strong>
          </p>
        </div>

        <div>
          {sortedAdvocates.map((advocate, index) => (
              <AdvocateCard key={advocate.id || index} advocate={advocate} />
          ))}
        </div>
      </main>

  );
}
