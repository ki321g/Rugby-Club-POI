import { db } from "../models/db.js";

export async function Analytics() {
  try {
    console.log("Analytics function called.");
    const totalUsers = await db.userStore.getAllUsers();
    const totalClubs = await db.clubStore.getAllClubs();
    const totalGames = await db.gameStore.getAllGames();

    const totalUsersQty = totalUsers.length;
    const totalClubsQty = totalClubs.length;
    const totalGamesQty = totalGames.length;

    let adminAnalytics = [];
    let clubAnalytics = [];
    let countyAnalytics = [];
    let highestScore = 0;
    let totalScore = 0;
    let largestScoreDifference = 0;

    // Calculate the number of clubs in each county
    await Promise.all(totalClubs.map(async (club) => {
      try {
        const index = countyAnalytics.findIndex((c) => c.address === club.address);  
        if (index !== -1) {
          countyAnalytics[index].clubCount += 1;
        } else {
          countyAnalytics.push({ address: club.address, clubCount: 1 });
        }
      } catch (error) {
        console.error("Error processing club:", club._id, error);
      }
    }));
    
    // Calculate the Club with the most games
    await Promise.all(totalClubs.map(async (club) => {
        try {
            const games = await db.gameStore.getGamesByClubId(club._id);              
            
            const maxGamesPerClub = { clubid: club._id, club: club.club, address: club.address, gameCount: games.length };
            clubAnalytics.push(maxGamesPerClub);
        } catch (error) {
            console.error("Error processing club:", club._id, error);
        }
    }));

    // Calculate the highest score
    totalGames.forEach(game => {
        const homeScore = Number(game.homescore); // Convert string to integer
        const awayScore = Number(game.awayscore); // Convert string to integer
        const totalScore = homeScore + awayScore;
        
        if (totalScore > highestScore) {
          highestScore = totalScore;
        }
    });
    
    // Calculate the largest score difference
    totalGames.forEach(game => {
        const homeScore = Number(game.homescore);
        const awayScore = Number(game.awayscore);
        const difference = Math.abs(homeScore - awayScore); // Calculate the absolute difference
    
        if (difference > largestScoreDifference) {
            largestScoreDifference = difference;
        }
    });
    
    // Sort the clubAnalytics array by gameCount in descending order
    clubAnalytics.sort((a, b) => b.gameCount - a.gameCount);
    const clubMostGames = clubAnalytics[0]; // This is the club with the most games
    
    return {
        totalUsersQty: totalUsersQty,
        totalClubsQty: totalClubsQty,
        totalGamesQty: totalGamesQty,
        clubMostGames: clubMostGames,
        highestScore,
        largestScoreDifference,
        countyAnalytics,        
        clubAnalytics
      };
  } catch (error) {
    console.error("Error in Analytics:", error);
    return null;
  }
}
