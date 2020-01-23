package aplikacija;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Film;

public class FilmoviServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		List<Film> filmovi = new ArrayList<>();
		
		Film film1 = new Film(1, "Mrtav ladan", "Stevo", "Milan, Marko", "Zanr1, Zanr2", "90", "Djoka", "Srbija", "2000", "Neki opis", true);
		Film film2 = new Film(2, "Kum", "Marica", "Filip, Stefan", "Zanr3, Zanr4", "120", "Italija prodaksn", "Italija", "2011", "Opis neki", true);
		Film film3 = new Film(3, "Celavi bez ruku za kosu se vuku", "Ivica", "Nemanja, Gojko", "Zanr2, Zanr3", "110", "Ker", "Srbija", "1980", "Opisan film", true);

		filmovi.add(film1);
		filmovi.add(film2);
		filmovi.add(film3);
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("filmovi", filmovi);

		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
