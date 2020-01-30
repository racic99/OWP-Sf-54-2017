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

}
