package baza;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import model.Film;

public class FilmDAO {
	
	public static List<Film> getAll() {
		List<Film> filmovi = new ArrayList<>();

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan "
					+ "FROM filmovi WHERE aktivan = 1";

			pstmt = conn.prepareStatement(query);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				int index = 1;
				int id = rset.getInt(index++);
				String naziv = rset.getString(index++);
				String reziser = rset.getString(index++);
				String glumci = rset.getString(index++);
				String zanrovi = rset.getString(index++);
				String trajanje = rset.getString(index++);
				String distributer = rset.getString(index++);
				String zemljaPorekla = rset.getString(index++);
				String godinaProizvodnje = rset.getString(index++);
				String opis = rset.getString(index++);
				boolean aktivan = rset.getBoolean(index++);

				Film film = new Film(id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan);
				
				filmovi.add(film);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				pstmt.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
			try {
				rset.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
			try {
				conn.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
		}

		return filmovi;
	}
	
	public static List<Film> getNaziv(String nazivPretraga) {
		List<Film> filmovi = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan FROM "
					+ "filmovi WHERE naziv LIKE ? and aktivan = 1";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, "%" + nazivPretraga + "%");

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				int id = rset.getInt(index++);
				String naziv = rset.getString(index++);
				String reziser = rset.getString(index++);
				String glumci = rset.getString(index++);
				String zanrovi = rset.getString(index++);
				String trajanje = rset.getString(index++);
				String distributer = rset.getString(index++);
				String zemljaPorekla = rset.getString(index++);
				String godinaProizvodnje = rset.getString(index++);
				String opis = rset.getString(index++);
				boolean aktivan = rset.getBoolean(index++);

				Film film = new Film(id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan);
				
				filmovi.add(film);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return filmovi;
	}
	
	public static List<Film> getZanrovi(String zanrPretraga) {
		List<Film> filmovi = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan FROM "
					+ "filmovi WHERE zanrovi LIKE ? and aktivan = 1";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, "%" + zanrPretraga + "%");

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				int id = rset.getInt(index++);
				String naziv = rset.getString(index++);
				String reziser = rset.getString(index++);
				String glumci = rset.getString(index++);
				String zanrovi = rset.getString(index++);
				String trajanje = rset.getString(index++);
				String distributer = rset.getString(index++);
				String zemljaPorekla = rset.getString(index++);
				String godinaProizvodnje = rset.getString(index++);
				String opis = rset.getString(index++);
				boolean aktivan = rset.getBoolean(index++);

				Film film = new Film(id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan);
				
				filmovi.add(film);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return filmovi;
	}
	
	public static List<Film> getOpsegTrajanja(String trajanje1, String trajanje2) {
		List<Film> filmovi = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan FROM "
					+ "filmovi WHERE CAST(trajanje AS int) >= ? and CAST(trajanje AS int) <= ? and aktivan = 1";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++,trajanje1);
			pstmt.setString(index++,trajanje2);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				int id = rset.getInt(index++);
				String naziv = rset.getString(index++);
				String reziser = rset.getString(index++);
				String glumci = rset.getString(index++);
				String zanrovi = rset.getString(index++);
				String trajanje = rset.getString(index++);
				String distributer = rset.getString(index++);
				String zemljaPorekla = rset.getString(index++);
				String godinaProizvodnje = rset.getString(index++);
				String opis = rset.getString(index++);
				boolean aktivan = rset.getBoolean(index++);

				Film film = new Film(id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan);
				
				filmovi.add(film);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return filmovi;
	}
	
	public static List<Film> getDistributeri(String distributeriPretraga) {
		List<Film> filmovi = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan FROM "
					+ "filmovi WHERE distributer LIKE ? and aktivan = 1";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, "%" + distributeriPretraga + "%");

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				int id = rset.getInt(index++);
				String naziv = rset.getString(index++);
				String reziser = rset.getString(index++);
				String glumci = rset.getString(index++);
				String zanrovi = rset.getString(index++);
				String trajanje = rset.getString(index++);
				String distributer = rset.getString(index++);
				String zemljaPorekla = rset.getString(index++);
				String godinaProizvodnje = rset.getString(index++);
				String opis = rset.getString(index++);
				boolean aktivan = rset.getBoolean(index++);

				Film film = new Film(id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan);
				
				filmovi.add(film);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return filmovi;
	}
	
	public static List<Film> getZemljaPorekla(String zemljaPoreklaPretraga) {
		List<Film> filmovi = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan FROM "
					+ "filmovi WHERE zemljaPorekla LIKE ? and aktivan = 1";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, "%" + zemljaPoreklaPretraga + "%");

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				int id = rset.getInt(index++);
				String naziv = rset.getString(index++);
				String reziser = rset.getString(index++);
				String glumci = rset.getString(index++);
				String zanrovi = rset.getString(index++);
				String trajanje = rset.getString(index++);
				String distributer = rset.getString(index++);
				String zemljaPorekla = rset.getString(index++);
				String godinaProizvodnje = rset.getString(index++);
				String opis = rset.getString(index++);
				boolean aktivan = rset.getBoolean(index++);

				Film film = new Film(id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan);
				
				filmovi.add(film);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return filmovi;
	}
	
	public static List<Film> getOpsegGodina(String godina1, String godina2) {
		List<Film> filmovi = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan FROM "
					+ "filmovi WHERE CAST(godinaProizvodnje AS int) >= ? and CAST(godinaProizvodnje AS int) <= ? and aktivan = 1";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++,godina1);
			pstmt.setString(index++,godina2);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				int id = rset.getInt(index++);
				String naziv = rset.getString(index++);
				String reziser = rset.getString(index++);
				String glumci = rset.getString(index++);
				String zanrovi = rset.getString(index++);
				String trajanje = rset.getString(index++);
				String distributer = rset.getString(index++);
				String zemljaPorekla = rset.getString(index++);
				String godinaProizvodnje = rset.getString(index++);
				String opis = rset.getString(index++);
				boolean aktivan = rset.getBoolean(index++);

				Film film = new Film(id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan);
				
				filmovi.add(film);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return filmovi;
	}
	
	public static boolean add(Film film) {
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		try {
			String query = "INSERT INTO filmovi (naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla,"
					+ " godinaProizvodnje, opis, aktivan) "
					+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

			pstmt = conn.prepareStatement(query);
			int index = 1;

			pstmt.setString(index++, film.getNaziv());
			pstmt.setString(index++, film.getReziser());
			pstmt.setString(index++, film.getGlumci());
			pstmt.setString(index++, film.getZanrovi());
			pstmt.setString(index++, film.getTrajanje());
			pstmt.setString(index++, film.getDistributer());
			pstmt.setString(index++, film.getZemljaPorekla());
			pstmt.setString(index++, film.getGodinaProizvodnje());
			pstmt.setString(index++, film.getOpis());
			pstmt.setBoolean(index++, film.isAktivan());
			

			return pstmt.executeUpdate() == 1;
			
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return false;
	}
	
	public static Film get(String idFilma) {

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan FROM filmovi WHERE id = ?";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, idFilma);

			rset = pstmt.executeQuery();
			
			int id = Integer.parseInt(idFilma);

			if (rset.next()) {
				index = 2;
				String naziv = rset.getString(index++);
				String reziser = rset.getString(index++);
				String glumci = rset.getString(index++);
				String zanrovi = rset.getString(index++);
				String trajanje = rset.getString(index++);
				String distributer = rset.getString(index++);
				String zemljaPorekla = rset.getString(index++);
				String godinaProizvodnje = rset.getString(index++);
				String opis = rset.getString(index++);
				boolean aktivan = rset.getBoolean(index++);

				return new Film(id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return null;
	}
	
	public static boolean izmenaFilma(Film film) {
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		try {
			String query = "UPDATE filmovi SET naziv = ?, reziser = ?, glumci = ?, zanrovi = ?, trajanje = ?, distributer = ?, zemljaPorekla = ?, godinaProizvodnje = ?, opis = ?  WHERE id = ?";

			String id = String.valueOf(film.getId());
			
			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, film.getNaziv());
			pstmt.setString(index++, film.getReziser());
			pstmt.setString(index++, film.getGlumci());
			pstmt.setString(index++, film.getZanrovi());
			pstmt.setString(index++, film.getTrajanje());
			pstmt.setString(index++, film.getDistributer());
			pstmt.setString(index++, film.getZemljaPorekla());
			pstmt.setString(index++, film.getGodinaProizvodnje());
			pstmt.setString(index++, film.getOpis());
			pstmt.setString(index++, id);

			return pstmt.executeUpdate() == 1;
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return false;
	}
	
	public static boolean brisanjeFilma(String idFilma) {
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		try {
			String query = "DELETE FROM filmovi WHERE id = ?";

			int index = 1;
			pstmt = conn.prepareStatement(query);
			pstmt.setString(index++, idFilma);

			return pstmt.executeUpdate() == 1;
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return false;
	}
	
	public static boolean logickoBrisanjeFilma(String idFilma) {
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		try {
			String query = "UPDATE filmovi SET aktivan = 0 WHERE id = ? AND id IN (SELECT film FROM projekcije)";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, idFilma);

			return pstmt.executeUpdate() == 1;
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return false;
	}
	
	public static List<Film> getSve() {
		List<Film> filmovi = new ArrayList<>();

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan "
					+ "FROM filmovi";

			pstmt = conn.prepareStatement(query);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				int index = 1;
				int id = rset.getInt(index++);
				String naziv = rset.getString(index++);
				String reziser = rset.getString(index++);
				String glumci = rset.getString(index++);
				String zanrovi = rset.getString(index++);
				String trajanje = rset.getString(index++);
				String distributer = rset.getString(index++);
				String zemljaPorekla = rset.getString(index++);
				String godinaProizvodnje = rset.getString(index++);
				String opis = rset.getString(index++);
				boolean aktivan = rset.getBoolean(index++);

				Film film = new Film(id, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, aktivan);
				
				filmovi.add(film);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return filmovi;
	}

}
